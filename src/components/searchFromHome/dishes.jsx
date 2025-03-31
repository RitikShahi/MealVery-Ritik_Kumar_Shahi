import React, { useState } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { addMultiple, addTocart, removeItem } from '../../../redux/cartSlice'

function Dishes({ item }) {
    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)

    function handleCart() {
        dispatch(addTocart({ ...item?.card?.card?.info, resId: item?.card?.card?.restaurant?.info?.id, LocalityOfRes: item?.card?.card?.restaurant?.info?.locality, nameOfRes: item?.card?.card?.restaurant?.info?.name }))
    }
    console.log(item)
    function handleMultipleAdd(id) {
        dispatch(addMultiple(Number(id)))
    }
    console.log(item)
    return (
        <div className=' bg-white p-4 rounded-lg cursor-pointer'>
            <div className='flex justify-between items-center mb-4'>
                <div>
                    <p className='font-bold text-sm text-zinc-600'>By {item.card?.card?.restaurant?.info?.name}</p>
                    <p className='text-[0.8rem] text-zinc-500'>{item.card?.card?.restaurant?.info?.avgRating} . {item.card?.card?.restaurant?.info?.sla?.minDeliveryTime}-{item.card?.card?.restaurant?.info?.sla?.maxDeliveryTime} MINS</p>
                </div>
                <div>
                    <FiArrowRight size={25} color='gray' />
                </div>
            </div>
            <div className='border border-dotted my-5'></div>
            <div className='flex justify-between'>
                <div>
                    < img className='max-w-4' src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Veg_symbol.svg" alt="" />
                    <p className='font-bold text-zinc-700 mt-1'>{item.card?.card?.info?.name}</p>
                    <p className='font-bold text-zinc-600'>₹{item.card?.card?.info?.price / 100}</p>

                    <button className='mt-3 border rounded-full text-sm py-[0.3rem] px-3 font-semibold flex items-center gap-2 text-zinc-500'>More Details
                        <MdOutlineKeyboardArrowRight size={20} />
                    </button>
                </div>
                <div className='max-w-36 h-36 relative'>
                    <img className='w-full h-full object-cover  rounded-lg' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${item.card?.card?.info?.imageId}`} alt="" />
                    {
                        !cart.find((prod) => prod.id == item?.card?.card?.info?.id) ? <div className=' absolute -bottom-4 left-4' onClick={handleCart}>
                            <button className='shadow-custom py-2 px-8 rounded-md bg-white hover:bg-gray-100 font-extrabold text-green-600' >ADD</button>
                        </div>
                            :
                            <div className=' absolute -bottom-4'>
                                <button className=' shadow-custom rounded-md bg-white font-extrabold text-green-600' >
                                    <div className='flex gap-3 items-center overflow-hidden rounded-md'>
                                        <div className=' hover:bg-gray-300 px-3 py-1 text-xl' onClick={() => dispatch(removeItem(Number(item.card?.card?.info?.id)))}>−</div>
                                        <div>{
                                            cart.map((prod) => prod.id == item.card?.card?.info?.id && prod.quantity)
                                        }</div>
                                        <div className=' hover:bg-gray-300 px-3 py-1 text-xl' onClick={() => handleMultipleAdd(item?.card?.card?.info?.id)}>+</div>
                                    </div>
                                </button>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Dishes