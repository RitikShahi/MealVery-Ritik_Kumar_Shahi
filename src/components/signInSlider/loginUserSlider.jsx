import React from 'react';
import { motion } from 'framer-motion';
import { RxCross2 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';

function LoginUserSlider({ closeSignInModel, logoutUser }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const variants = {
        hidden: { x: '100%', opacity: 0 },
        visible: { x: '0%', opacity: 1 },
        exit: { x: '100%', opacity: 0 }
    };

    return (
        <motion.div
            className='absolute right-0 top-0 w-[37%] h-screen bg-[#0A1F44] py-5 px-8 pr-36 rounded-md shadow-lg text-white'
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.2 }}
        >
            {/* Close button */}
            <RxCross2 onClick={closeSignInModel} size={30} color='white' cursor={'pointer'} className='absolute top-5 right-5' />
            
            {/* User Info */}
            <div className='flex justify-between items-center'>
                <div className='text-center w-full'>
                    <img className='w-20 mt-6 mb-5 rounded-full mx-auto' src={user?.userInfo?.img} alt="User Avatar" />
                    <h3 className='text-3xl font-semibold text-white'>{user?.userInfo?.name}</h3>
                    <p className='mt-2 text-sm text-gray-300'><span className='font-medium cursor-pointer'>Logged into <strong>MealVery</strong> 😄</span></p>
                </div>
            </div>

            {/* Logout Button */}
            <button className='bg-blue-500 text-white text-center mt-6 w-full h-12 text-sm font-bold rounded-md hover:bg-blue-600 transition-all' onClick={logoutUser}>
                LOGOUT
            </button>
        </motion.div>
    );
}

export default LoginUserSlider;
