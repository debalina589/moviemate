import React from 'react'
import { assets } from '../assets/assets'
import { ArrowRight, CalendarIcon, ClockIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const HeroSection = () => {
  const navigate = useNavigate()
  const { shows, image_base_url } = useAppContext();
  const featuredShow = shows.length > 0 ? shows[0] : null;
  const geners = featuredShow ? featuredShow.genres.map(genre => genre.name).join(' | ') : 'Genre1 | Genre2 | Genre3';
  const runtimeMinutes = featuredShow.runtime; // Example runtime in minutes
  const hours = Math.floor(runtimeMinutes / 60);
  const minutes = runtimeMinutes % 60;
  const formattedRuntime = `${hours}h ${minutes}m`; 
  return (
    <div
      className='flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-[url("/src/assets/assets/hero.jpg")] bg-cover bg-center h-screen'
      style={{ backgroundImage: `url(${image_base_url + featuredShow?.backdrop_path})` }}
    >
      {/* <img src={assets.marvelLogo} alt="" className= "max-h-11 lg:h-11 mt-20"/> */}
      <h1 className='mt-18 text-5xl md:text-[70px] md:leading-18 font-semibold max-w-110'>{featuredShow?.title}</h1>
      <div className='flex items-center gap-4 text-gray-300'>
        <span>{geners}</span>
      </div>
      <div className='flex items-center gap-1'>
        <CalendarIcon className='w-4.5 h-4.5' /> {featuredShow?.release_date.slice(0, 4)}
      </div>
      <div className='flex items-center gap-1'>
        <ClockIcon className='w-4.5 h-4.5' /> {formattedRuntime}
      </div>
      <p className='max-w-md text-gray-300'>{featuredShow.overview}</p>
      <button onClick={() => navigate('/movies')} className='flex items-center gap-1 px-6 py-3 text-sm bg-blue-500 text-white hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'>
        Explore Movies
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>

  )
}

export default HeroSection