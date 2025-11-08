//import express from "express";
import Booking from "../models/Booking.js";
import Show from "../models/Show.js";

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