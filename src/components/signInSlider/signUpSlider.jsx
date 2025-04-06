import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RxCross2 } from 'react-icons/rx';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, googleAuth } from '../../../auth/firebaseAuth';
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
function SignUpSlider({ closeSignInModel, handleLoginAccount }) {
    const variants = {
        hidden: { x: '100%', opacity: 0 },
        visible: { x: '0%', opacity: 1 },
        exit: { x: '100%', opacity: 0 }
    };

    const [inputValues, setInputValues] = useState({
        number: '',
        name: '',
        email: ''
    });

    const handleChange = (e) => {
        setInputValues({ ...inputValues, [e.target.name]: e.target.value });
    };

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
                    <p className='mt-2 text-sm text-white'>
                        or <span className='text-orange-500 font-medium cursor-pointer' onClick={handleLoginAccount}>Login into your account</span>
                    </p>
                    <div className='w-10 border-b-2 border-white absolute top-40'></div>
                </div>
                <div>
                    <img className='w-28' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r" alt="login visual" />
                </div>
            </div>

            {/* Input Fields */}
            <div className='mt-10'>
                {['number', 'name', 'email'].map((field, idx) => (
                    <div key={field} className='relative mt-5'>
                        <input
                            type={field === 'email' ? 'email' : field === 'number' ? 'number' : 'text'}
                            name={field}
                            value={inputValues[field]}
                            onChange={handleChange}
                            required
                            className='peer w-full h-16 px-4 pt-6 text-lg font-semibold outline-none border border-gray-200 bg-white rounded-md'
                        />
                        <label
                            htmlFor={field}
                            className='absolute left-4 top-5 text-gray-500 text-base transition-all peer-focus:top-2 peer-focus:text-sm peer-valid:top-2 peer-valid:text-sm'
                        >
                            {field === 'number' ? 'Phone Number' : field.charAt(0).toUpperCase() + field.slice(1)}
                        </label>
                    </div>
                ))}
            </div>

            <button className='bg-blue-500 text-white text-center mt-6 w-full h-12 text-sm font-bold rounded-md' onClick={handleLoginGoogle}>
                SIGN UP
            </button>
            <p className='text-[0.73rem] mt-3 font-semibold text-white'>
                <span className='text-gray-200'>By clicking on Sign Up, I accept the</span> Terms & Conditions & Privacy Policy
            </p>
        </motion.div>
    );
}

export default SignUpSlider;
