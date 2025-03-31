import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RxCross2 } from 'react-icons/rx';

function SignUpSlider({ closeSignInModel, handleLoginAccount }) {
    const variants = {
        hidden: { x: '100%', opacity: 0 },
        visible: { x: '0%', opacity: 1 },
        exit: { x: '100%', opacity: 0 }
    };

    const [checkFocus, setCheckFocus] = useState({
        number: false,
        name: false,
        email: false
    });

    function handleFocus(e) {
        setCheckFocus({ ...checkFocus, [e.target.name]: true });
    }

    function handleBlurInput(e) {
        setCheckFocus({ ...checkFocus, [e.target.name]: e.target.value !== '' });
    }

    return (
        <motion.div
            className='absolute right-0 top-0 w-[37%] h-screen bg-sky-300 py-5 px-8 pr-36'
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.2 }}
        >
            <RxCross2 onClick={closeSignInModel} size={30} color='gray' cursor='pointer' />
            <div className='flex justify-between items-center'>
                <div>
                    <h3 className='text-3xl font-semibold text-white'>Sign Up</h3>
                    <p className='mt-2 text-sm text-white'>or <span className='text-orange-500 font-medium cursor-pointer' onClick={handleLoginAccount}>Login into your account</span></p>
                    <div className='w-10 border-b-2 border-white absolute top-40'></div>
                </div>
                <div>
                    <img className='w-28' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r" alt="" />
                </div>
            </div>

            <div className='mt-10 border-collapse'>
                <div className='border border-gray-200 h-16 px-4 bg-white rounded-md'>
                    <p className={`mt-1 font-semibold text-gray-500 ${!checkFocus['number'] ? 'text-base py-4' : 'text-sm'} transition-all`}>Phone Number</p>
                    {checkFocus['number'] && <input type="number" className='w-full py-1 text-lg font-semibold outline-none border-none' name='number' autoFocus onFocus={handleFocus} onBlur={handleBlurInput} />}
                </div>
                <div className='border border-gray-200 h-16 px-4 bg-white rounded-md mt-4'>
                    <p className={`font-semibold text-gray-500 ${!checkFocus['name'] ? 'text-base py-5' : 'text-sm'} transition-all`}>Name</p>
                    {checkFocus['name'] && <input type="text" className='w-full py-1 text-lg font-semibold outline-none border-none' name='name' onFocus={handleFocus} onBlur={handleBlurInput} autoFocus />}
                </div>
                <div className='border border-gray-200 h-16 px-4 bg-white rounded-md mt-4'>
                    <p className={`mt-1 font-semibold text-gray-500 ${!checkFocus['email'] ? 'text-base py-4' : 'text-sm'} transition-all`}>Email</p>
                    {checkFocus['email'] && <input type="email" className='w-full py-1 text-lg font-semibold outline-none border-none' name='email' onFocus={handleFocus} onBlur={handleBlurInput} autoFocus />}
                </div>
            </div>

            <button className='bg-blue-500 text-white text-center mt-6 w-full h-12 text-sm font-bold rounded-md'>
                SIGN UP
            </button>
            <p className='text-[0.73rem] mt-3 font-semibold text-white'><span className='text-gray-200'>By clicking on Sign Up, I accept the</span> Terms & Conditions & Privacy Policy</p>
        </motion.div>
    );
}

export default SignUpSlider;