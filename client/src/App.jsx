import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import SeatLayout from './pages/SeatLayout'
import MyBookings from './pages/MyBookings'
import Favorite from './pages/Favorite'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'
import Layout from './pages/admin/Layout'
import { SignIn } from '@clerk/clerk-react'
import AddShows from './pages/admin/AddShows'
import ListBookings from './pages/admin/ListBookings'
import ListShows from './pages/admin/ListShows'
import Dashboard from './pages/admin/Dashboard'
import { useAppContext } from './context/AppContext'
import Loading from './components/Loading'

const App = () => {

    const isAdminRoutes = useLocation().pathname.startsWith('/admin');
    const { user } = useAppContext();

    return (
        <div className='w-screen h-screen bg-gradient-to-b from-black via-blue-900 to-black overflow-x-hidden'>
            <Toaster />
            {!isAdminRoutes && <Navbar />}
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/movies' element={<Movies />} />
                <Route path='/movies/:id' element={<MovieDetails />} />
                <Route path='/movies/:id/:date' element={<SeatLayout />} />
                <Route path='/my-bookings' element={<MyBookings />} />
                <Route path='/loading/:nextUrl' element={<Loading />} />
                <Route path='/favorite' element={<Favorite />} />
                <Route path='/admin/*' element={user ? <Layout /> : (
                    <div className='min-h-screen flex items-center justify-center'>
                        <SignIn fallbackRedirectUrl={'/admin'} />
                    </div>
                )} >
                    <Route index element={<Dashboard />} />
                    <Route path='add-shows' element={<AddShows />} />
                    <Route path='list-shows' element={<ListShows />} />
                    <Route path="list-bookings" element={<ListBookings />} />
                </Route>

            </Routes>
            {!isAdminRoutes && <Footer />}
        </div>
    )
}

export default App