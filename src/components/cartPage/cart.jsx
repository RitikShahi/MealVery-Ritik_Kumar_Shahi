import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Coordinates } from '../../../context/contextApi';
import { addMultiple, removeItem } from '../../../redux/cartSlice';
import { Link } from 'react-router-dom';
import ModelPortal from '../signInSlider/modelPortal';
import { RxCross1 } from 'react-icons/rx';

function Cart() {
    const { coord } = useContext(Coordinates);
    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    async function fetchDataById(res) {
        const response = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${coord.lat}&lng=${coord.lng}&restaurantId=${res}&catalog_qa=undefined&submitAction=ENTER`);
        const data = await response.json();
        console.log(data);
    }

    useEffect(() => {
        fetchDataById(cart.resId);
    }, [cart, coord]);

    const [showPopupForOrder, setPopupForOrder] = useState('');

    function handlePlaceOrder() {
        if (user?.userInfo !== null) {
            setPopupForOrder('confirm');
        } else {
            setPopupForOrder('pleaseLogin');
        }
    }

    return (
        <div className='bg-[#f0f8ff] min-h-screen flex justify-center items-center px-6'>
            <div className='w-full max-w-4xl bg-white shadow-xl rounded-lg p-6'>
                {showPopupForOrder && (
                    <ModelPortal>
                        <div className='bg-white w-[400px] h-[200px] absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] p-4 rounded-lg shadow-lg'>
                            <RxCross1 className='absolute right-4 top-4 cursor-pointer' size={20} onClick={() => setPopupForOrder('')} />
                            <div className='flex flex-col items-center justify-center h-full'>
                                <p className='text-blue-600 text-xl font-bold uppercase'>{showPopupForOrder === 'confirm' ? 'Order Confirmed' : 'Please Login'}</p>
                                <button className='mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg' onClick={() => setPopupForOrder('')}>Continue</button>
                            </div>
                        </div>
                    </ModelPortal>
                )}
                <h2 className='text-2xl font-bold text-blue-700 mb-4 text-center'>Your Cart</h2>
                {cart.length === 0 ? (
                    <div className='text-center py-20'>
                        <h3 className='text-lg text-gray-600'>Your cart is empty</h3>
                        <p className='text-gray-400'>Go back to explore more restaurants.</p>
                        <Link to='/' className='mt-5 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg'>See Restaurants</Link>
                    </div>
                ) : (
                    <div>
                        {cart.map((item) => (
                            <div key={item.id} className='flex justify-between items-center border-b py-4'>
                                <div className='flex items-center gap-4'>
                                    <img className='w-12 h-12 object-cover rounded-md' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${item.imageId}`} alt={item.name} />
                                    <div>
                                        <h5 className='text-lg font-semibold'>{item.name}</h5>
                                        <p className='text-sm text-gray-500'>{item.LocalityOfRes}</p>
                                    </div>
                                </div>
                                <div className='flex items-center gap-4'>
                                    <button className='bg-blue-500 text-white px-2 py-1 rounded' onClick={() => dispatch(removeItem(item.id))}>-</button>
                                    <span className='text-lg font-bold text-blue-600'>{item.quantity}</span>
                                    <button className='bg-blue-500 text-white px-2 py-1 rounded' onClick={() => dispatch(addMultiple(item.id))}>+</button>
                                </div>
                                <p className='text-lg font-semibold text-blue-700'>₹{(item.price / 100 * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                        <div className='text-right mt-6'>
                            <h4 className='text-xl font-bold text-blue-700'>Total: ₹{
                                cart.reduce((total, item) => total + (item.price / 100 * item.quantity), 0).toFixed(2)
                            }</h4>
                        </div>
                        <button className='w-full bg-blue-500 text-white py-3 mt-4 rounded-lg text-lg font-bold' onClick={handlePlaceOrder}>PLACE ORDER</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cart;
