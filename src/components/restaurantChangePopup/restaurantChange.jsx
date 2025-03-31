import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewRes, cancelToAddNewRes } from '../../../redux/cartSlice'

function RestaurantChange({ resId }) {

    const cart = useSelector((state) => state.cart)
    const dispatch = useDispatch()

    function cancelAddNewRes() {
        dispatch(cancelToAddNewRes(resId))
    }

    function handleAddRes() {
        dispatch(addNewRes(resId))
    }

    return (
        <div className='w-[35rem] fixed left-[34%] bottom-12 bg-white z-50 shadow-2xl p-6'>
            <h3 className='text-[1.3rem] font-bold'>Items already in cart</h3>
            <p className=' mt-2 mb-5 text-sm text-zinc-500'>Your cart contains items from other restaurant. Would you like to reset your cart for adding items from this restaurant?</p>

            <div className='flex h-12 gap-5'>
                <button className='border border-[#60b246] w-full text-base font-bold text-[#60b246] hover:bg-[#60b246] hover:text-white transition-all' onClick={cancelAddNewRes}>NO</button>
                <button className='bg-[#60b246] w-full text-base font-bold text-white' onClick={handleAddRes}>YES, START A FRESH</button>
            </div>
        </div>
    )
}

export default RestaurantChange