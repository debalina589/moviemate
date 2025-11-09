import { ChartLineIcon, CircleDollarSignIcon, PlayCircleIcon, StarIcon, UsersIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { dummyDashboardData } from '../../assets/assets.js';
import Loading from '../../components/Loading.jsx';
import Title from '../../components/admin/Title.jsx';
import { dateFormat } from '../../library/dateFormat.js';
import { useAppContext } from '../../context/AppContext.jsx';
import toast from 'react-hot-toast';

const Dashboard = () => {

  const { axios, getToken, user, image_base_url } = useAppContext();

  const currency = import.meta.env.VITE_CURRENCY
  const [dasboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeShows: [],
    totalUser: 0
  });
  const [loading, setLoading] = useState(true);
  const dashboardCards = [
    { title: "Total Bookings", value: dasboardData.totalBookings || "0", icon: ChartLineIcon },
    { title: "Total Revenue", value: currency + dasboardData.totalRevenue || "0", icon: CircleDollarSignIcon },
    { title: "Active Shows", value: dasboardData.activeShows.length || "0", icon: PlayCircleIcon },
    { title: "Total Users", value: dasboardData.totalUser || "0", icon: UsersIcon }
  ]
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/admin/dashboard', {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      })
      if (data.success) {
        setDashboardData(data.dashboardData)
      }
    } catch (error) {
      toast.error('Failed to fetch dashboard data', error)
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, []);
  return !loading ? (
    <>
      <Title text1="Admin " text2=" Dashboard" />
      <div className='relative flex flex-wrap gap-4 mt-6' >
        <div className='flex flex-wrap gap-4 w-full' >{dashboardCards.map((card, index) => (
          <div key={index} className='flex items-center justify-between px-4 py-3 bg-blue-500/50 border border-blue-500/90 rounded-md max-w-50 w-full'>
            <div>
              <h1 className='text-sm'>{card.title}</h1>
              <p className='text-xl font-medium mt-1'>{card.value}</p>
            </div>
            <card.icon className='w-6 h-6' />
          </div>
        ))}
        </div>
      </div>
      <p className='mt-10 text-lg font-medium'>Active Shows</p>
      <div className='relative flex flex-wrap gap-6 mt-4 max-w-5xl'>{dasboardData.activeShows.map((show) => (
        <div key={show._id} className='w-55 rounded-lg overflow-hidden h-full pb-3 bg-blue-500/50 hover:-translate-y-1 transition duration-300'>
          <img src={image_base_url + show.movie.poster_path} alt="" className='h-60 w-full object-cover' />
          <p className='font-medium p-2 truncate'>{show.movie.title}</p>
          <div className='flex items-center justify-between px-2'>
            <p className='text-lg font-medium'>{currency}{show.showPrice}</p>
            <p className='flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1'>
              <StarIcon className='w-4 h-4 text-blue-500 fill-blue-500' />
              {show.movie.vote_average.toFixed(1)}
            </p>
          </div>
          <p className='px-2 pt-2 text-sm text-gray-200'>{dateFormat(show.showDateTime)}</p>
        </div>
      ))}

      </div>
    </>
  ) : <Loading />
}

export default Dashboard