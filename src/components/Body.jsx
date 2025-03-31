import React from 'react'
import OnYourMind from './onYourMind';
import TopRestaurant from './topRestaurant ';
import OnlineFoodDelivery from './onlineFoodDelivery';

function Body() {
    return (
        <div className='w-full min-h-screen '>
            <div className='w-[80%] mx-auto'>
                <OnYourMind />
                <TopRestaurant />
                <OnlineFoodDelivery />
            </div>
        </div>
    )
}
export default Body