import React from 'react'
import { useNavigate } from 'react-router-dom'

function Restaurant({ item }) {
    const navigate = useNavigate()

    function handleNavigate(id) {
        navigate(`restaurants/${id}`)
    }

    return (
        <div onClick={() => handleNavigate(item.info?.feeDetails?.restaurantId)} className=' bg-white p-4 rounded-lg cursor-pointer'>
            <div className='flex gap-4 items-center mb-4'>
                <div className='w-28 h-28 overflow-hidden'>
                    <img className='w-full h-full object-cover rounded-lg' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${item.info?.cloudinaryImageId}`} alt="" />
                </div>

                <div>
                    <p className='font-bold text-sm text-zinc-600'>By {item.info?.name}</p>
                    <p className='text-[0.8rem] text-zinc-500'>{item.info?.avgRating} . {item.info?.sla?.minDeliveryTime}-{item.info?.sla?.maxDeliveryTime} MINS</p>
                    <p className='text-[0.83rem] text-zinc-400 mt-1'>{item.info?.cuisines.map((item, idx, arr) => `${item} ${idx < arr.length - 1 ? ',' : ''}`)}</p>
                </div>
            </div>
        </div >
    )
}

export default Restaurant