import React from 'react'
import { FaStar } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function Restaurant({ item }) {
    const { id, name, cloudinaryImageId, cuisines, aggregatedDiscountInfoV3, avgRating, sla } = item.info

    return (
        <>
            <Link to={`/restaurants/${id}`} className='hover:scale-95 transition-all duration-200 cursor-pointer'>
                <div className='relative'>
                    <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryImageId}`} alt="" className='w-[17.5rem] rounded-2xl h-48 object-cover' />
                    <div className='text-xl text-zinc-50 font-extrabold absolute bottom-2 left-3 z-10'>{aggregatedDiscountInfoV3?.header} {aggregatedDiscountInfoV3?.subHeader}</div>
                    <div className="bg-custom-gradient w-[17.5rem] rounded-2xl h-48 absolute bottom-0 z-0"></div>
                </div>

                <div className='w-[17rem] mt-2 mx-4'>
                    <p className='text-[1.20rem] font-bold'>{name}</p>
                    <div className='flex items-center gap-1 mt-1'>
                        <div className='bg-green-700 w-[22.7px] h-[22px] flex items-center justify-center rounded-full'>
                            <FaStar color='white' />
                        </div>
                        <p className='font-semibold'>{avgRating}</p>
                        <div className='font-semibold'>•</div>
                        <p className='font-semibold'>{sla.slaString}</p>
                    </div>
                    <div className='text-zinc-500 text-[16px] mt-1 text-wrap break-words'>
                        {
                            cuisines.join(',')
                        }
                    </div>
                </div>
            </Link>
        </>
    )
}

export default Restaurant