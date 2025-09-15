import React, { useState } from 'react'
import BlurCircle from './BlurCircle'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const DateSelect = ({dateTime, id}) => {

const navigate = useNavigate();
   const [selected, setSelected] = useState(null)
    const onBookHandler = ()=>{
        if(!selected){
            return toast('Please Select a date')
        }
        navigate(`/movies/${id}/${selected}`)
        scrollTo(0,0)

    }

  return (
    <div id='dateSelect' className='pt-30'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-10 relative p-8 bg-blend-screen border border-primary rounded-lg'>
        <BlurCircle top="-100px" left="-100px"/>
        <BlurCircle top="100px" right="0px"/>
        <div>
            <p className='text-lg font-semibold'>Choose Date</p>
            <div className='flex items-center gap-6 text-sm mt-5'>
                <ChevronLeftIcon width={28}/>
                <span className='flex items-center gap-6 text-sm'>{Object.keys(dateTime).map((date)=>(
                    <button onClick={()=> setSelected(date)} key={date} className={`flex flex-col items-center justify-center h-14 w-14 aspect-square rounded cursor-pointer ${selected === date ? "bg-blue-500 text-white" : "border border-red/70"}`}>
                      <span>{new Date(date).getDate()}</span>  
                      <span>{new Date(date).toLocaleDateString("en-US",{month: "short"})}</span>  
                    </button>
                ))}</span>
             <ChevronRightIcon width={28}/>
            </div>
        </div>
        <button onClick={onBookHandler}  className='bg-blue-500 text-white px-8 py-2 mt-6 rounded hover:bg-blue-400 transition-all cursor-pointer'>Book Now</button>
        </div>

    </div>
  )
}

export default DateSelect