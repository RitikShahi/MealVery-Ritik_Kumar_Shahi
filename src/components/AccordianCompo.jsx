import React, { useState } from 'react'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import AccordianFoodData from './AccordianFoodData'

function AccordianCompo({ card, totalLength, idx, resName, resLocation }) {
    const [showToggle, setShowToggle] = useState(false)

    return (
        <>
            <div className={`flex justify-between px-4 items-center ${idx < totalLength - 2 ? 'border-t-[18px]' : ''} cursor-pointer`} onClick={() => setShowToggle(!showToggle)}>
                <p className='py-4  text-lg font-bold'>{card?.card?.card?.title || card && card?.title} {`${card?.card?.card?.itemCards?.length || card && card?.itemCards?.length}` && (`(${card?.card?.card?.itemCards?.length || card && card?.itemCards?.length || ''})`)}</p>
                <MdOutlineKeyboardArrowDown size={30} className={` ${showToggle ? 'rotate-180' : ''}`} />
            </div>

            {showToggle && (card?.card?.card?.itemCards || card && card?.itemCards || []).map((item, idx) => (
                item && <AccordianFoodData key={idx} data={item.card.info} nameOfRes={resName} LocalityOfRes={resLocation} />
            ))}

            {
                card?.card?.card?.categories?.length > 0 && (
                    card?.card?.card?.categories?.map((item, idx) => {
                        return item && <div className='border-b-2 pl-6 text-sm' key={idx}>
                            <AccordianCompo card={item} totalLength={0} idx={0} key={idx} />
                        </div>
                    })
                )
            }
        </>
    )
}

export default AccordianCompo