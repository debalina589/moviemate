//import express from "express";
import Booking from "../models/Booking.js";
import Show from "../models/Show.js";
import stripe from 'stripe';

// Function to check availability of selected seats for a movie 
const checkSeatsAvailability = async (showId, selectedSeats) => {
    try {
       const showData =  await Show.findById(showId);
       if (!showData) return false;
       const occupiedSeats = showData.occupiedSeats || {};
       // If occupiedSeats is an array, use includes; otherwise treat it as a map/object
       let isAnySeatTaken = false;
       if (Array.isArray(occupiedSeats)) {
           isAnySeatTaken = selectedSeats.some((seat) => occupiedSeats.includes(seat));
       } else {
           isAnySeatTaken = selectedSeats.some(seat => Boolean(occupiedSeats[seat]));
       }
       return !isAnySeatTaken;
    } catch (error) {
        console.error("Error checking seat availability:", error.message);
        return false;
    }};
export const createBooking = async (req, res) => {
    try {
        // support different auth shapes: req.auth (object) or req.user
     const userId = (req.auth && req.auth.userId) || (req.user && (req.user.id || req.user._id));
        if (!userId)
             return res.status(401).json({ success: false, message: 'Unauthorized' });

        const {showId, selectedSeats} = req.body;
        //const {origin} = req.headers;

        // Check if the seat is available for the selected show
        const isAvailable = await checkSeatsAvailability(showId, selectedSeats);
        if(!isAvailable){
            return res.json({success: false, message: "Selected Seats are not available."});
        }
        // Get the show details 
        const showData = await Show.findById(showId).populate('movie');
        if (!showData) {
            return res.json({ success: false, message: 'Show not found' });
        }
        // Create a new booking
        const booking = await Booking.create({
            user: userId,
            show: showId,
            amount: (showData.showPrice || 0) * (selectedSeats ? selectedSeats.length : 0),
            bookedSeats: selectedSeats
        });
        // mark seats as occupied
        if (!showData.occupiedSeats) showData.occupiedSeats = {};
        selectedSeats.forEach((seat)=> {
            showData.occupiedSeats[seat] = userId;
        });
        showData.markModified('occupiedSeats');
        await showData.save();
        //stripe gateway intialization
        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)

        // creating line items to for stripe
        const line_items = [{
            price_data: {
                currency: 'usd',
                product_data: {
                    name: showData.movie.title
                },
                unit_amount: Math.floor(booking.amount) * 100
            },
            quantity: 1
        }]

        const session = await stripeInstance.checkout.sessions.create({
            success_url: `${origin}/loading/my-bookings`,
            cancel_url: `${origin}/my-bookings`,
            line_items: line_items,
            mode: 'payment',
            metadata: {
                bookingId: booking._id.toString()
            },
            expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // Expires in 30 minutes
        })
        booking.paymentLink = session.url
        await booking.save()

        res.json({success: true, url: session.url})

        return res.json({success: true, message: "Booking successful", booking});
    } catch(error) {
        console.error("Error creating booking:", error.message);
        res.json({success: false, message: error.message});
    }
    };
export const getOccupiedSeats = async (req, res) => {
    try {
        const {showId} = req.params;
        const showData = await Show.findById(showId);
        if (!showData) {
            return res.json({ success: false, message: "Show not found" });
        }

        const occupiedSeats = Object.keys(showData.occupiedSeats || {});
        res.json({success: true, occupiedSeats});
        
    } catch (error) {
       console.log(error.message);
        res.json({success: false, message: error.message});
    }
};   