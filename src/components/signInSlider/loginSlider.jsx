import React from 'react';
import { motion } from 'framer-motion';
import { RxCross2 } from 'react-icons/rx';
import { auth, googleAuth } from '../../../auth/firebaseAuth';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { addUser } from '../../../redux/userSlice';

function LoginSlider({ closeSignInModel, handleCreateAccount }) {
    const dispatch = useDispatch();

    const variants = {
        hidden: { x: '100%', opacity: 0 },
        visible: { x: '0%', opacity: 1 },
        exit: { x: '100%', opacity: 0 }
    };

    async function handleLoginGoogle() {
        try {
            const result = await signInWithPopup(auth, googleAuth);
            const user = result.user;
            const userData = {
                name: user?.displayName,
                img: user?.photoURL
            };
            dispatch(addUser(userData));
        } catch (error) {
            console.error('Error signing in with Google:', error);
        }
    }

    async function handleLoginEmail() {
        try {
            const email = prompt("Enter your email:");
            const password = prompt("Enter your password:");
            if (!email || !password) return;

            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const userData = {
                name: user?.displayName || 'User',
                img: user?.photoURL || ''
            };
            dispatch(addUser(userData));
        } catch (error) {
            console.error('Error signing in with email:', error);
        }
    }

    return (
        <motion.div
            className='absolute right-0 top-0 w-[37%] h-screen bg-white py-5 px-8 pr-36'
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.2 }}
        >
            <RxCross2 onClick={closeSignInModel} size={30} color='gray' cursor={'pointer'} />
            <div className='flex justify-between items-center'>
                <div>
                    <h3 className='text-3xl font-semibold'>Login</h3>
                    <p className='mt-2 text-sm'>or <span className='text-orange-500 font-medium cursor-pointer' onClick={handleCreateAccount}>create an account</span></p>
                    <div className='w-10 border-b-2 border-black absolute top-40'></div>
                </div>
                <div>
                    <img className='w-28' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r" alt="" />
                </div>
            </div>

            {/* Login Buttons */}
            <button className='bg-[#ff5200] text-white text-center mt-6 w-full h-12 text-sm font-bold' onClick={handleLoginEmail}>
                LOGIN WITH EMAIL
            </button>

            <button className='bg-blue-600 text-white text-center mt-3 w-full h-12 text-sm font-bold' onClick={handleLoginGoogle}>
                LOGIN WITH GOOGLE
            </button>

            <p className='text-[0.73rem] mt-3 font-semibold'>
                <span className='text-gray-500'>By clicking on Login, I accept the</span> Terms & Conditions & Privacy Policy
            </p>
        </motion.div>
    );
}

export default LoginSlider;
