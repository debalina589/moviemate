import React from 'react'
import { assets } from '../assets/assets/assets'
import { ArrowRight, CalendarIcon, ClockIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'


const HeroSection = () => {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-[url("/src/assets/assets/hero.jpg")] bg-cover bg-center h-screen'>
        {/* <img src={assets.marvelLogo} alt="" className= "max-h-11 lg:h-11 mt-20"/> */}
        <h1 className='mt-18 text-5xl md:text-[70px] md:leading-18 font-semibold max-w-110'>LA LA <br/>LAND</h1>
        <div className='flex items-center gap-4 text-gray-300'>
            <span>Romantic Comedy | Drama | Music</span>
        </div>
        <div className='flex items-center gap-1'>
            <CalendarIcon className='w-4.5 h-4.5'/> 2016
        </div>
         <div className='flex items-center gap-1'>
            <ClockIcon className='w-4.5 h-4.5'/> 2h 8m
        </div>
        <p className='max-w-md text-gray-300'>When Sebastian, a pianist, and Mia, an actress, follow their passion and achieve success in their respective fields, they find themselves torn between their love for each other and their careers.</p>
        <button onClick={()=> navigate('/movies')}className='flex items-center gap-1 px-6 py-3 text-sm bg-blue-500 text-white hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'>
          Explore Movies
          <ArrowRight className= "w-5 h-5"/>
        </button>
    </div>
    
  )
}

export default HeroSection