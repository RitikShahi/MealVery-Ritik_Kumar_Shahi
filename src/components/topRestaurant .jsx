import React, { useContext, useEffect, useRef, useState } from 'react'
import { IoArrowBackCircleOutline, IoArrowForwardCircleOutline } from 'react-icons/io5'
import Restaurant from './restaurantCard';
import UsehandleScoll from '../../hooks/scroll';
import useFetch from '../../hooks/useFetch';
import { ShimmerDiv, ShimmerSectionHeader } from 'shimmer-effects-react';
import { Coordinates } from '../../context/contextApi';


function TopRestaurant() {

    const [cards, setCards] = useState([])
    const [slideCount, setSlideCount] = useState(0)
    const { coord } = useContext(Coordinates)

    const { data, loading, error } = useFetch(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${coord.lat}&lng=${coord.lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`)

    useEffect(() => {
        if (data && data.data) {
            setCards(data?.data?.cards[1].card?.card?.gridElements?.infoWithStyle?.restaurants)
        }
    }, [data, coord])

    const refDiv = useRef()

    const cardsLength = Math.floor(cards?.length / 4)

    function handleNextSlide() {
        if (slideCount < cardsLength) {
            setSlideCount(prev => prev + 1)
        }
    }

    function handlePrevSlide() {
        if (slideCount > 0) {
            setSlideCount(prev => prev - 1)
        }
    }

    const { progressWidth } = UsehandleScoll(refDiv)
    return (
        <>
            <div className='flex justify-between pb-4'>
                <p className='text-2xl font-bold capitalize'>Top restaurant chains in {(data?.data?.cards[11]?.card?.card?.citySlug)}</p>
                <div className='flex gap-1'>
                    <div><IoArrowBackCircleOutline size={30} cursor={'pointer'} onClick={() => handlePrevSlide()} color={slideCount == 0 ? 'lightgrey' : 'black'} /></div>
                    <div><IoArrowForwardCircleOutline size={30} cursor={'pointer'} onClick={() => handleNextSlide()} color={slideCount < cardsLength ? 'black' : 'lightgrey'} /></div>
                </div>
            </div>

            <div className='overflow-hidden overflow-x-auto scrollbar-hide' ref={refDiv} >
                <div className={`flex gap-4`} style={{ transform: `translateX(-${1080 * slideCount}px)`, transition: '0.7s' }} >
                    <div className=' max-w-xl'>
                        <div className='flex gap-5 h-[19rem]'>
                            {!loading ?
                                cards.map((item, idx) => {
                                    return (
                                        <Restaurant key={item.info.id} item={item} />
                                    )
                                })
                                : (
                                    <div className='flex gap-5'>
                                        {
                                            Array.from({ length: 4 }).map((_, idx) => {
                                                return (
                                                    <div className='flex flex-col gap-4' key={idx}>
                                                        <ShimmerDiv mode="light" height={192} width={296} rounded={1} />
                                                        <ShimmerSectionHeader center={false} mode="light" className='ml-5' />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
                <div className='bg-gray-200 w-10 h-[0.3rem] rounded my-3 sticky top-[72%] left-[50%]'>
                    <div className='bg-orange-600 w-3 h-[0.3rem] rounded' style={{ width: `${progressWidth || slideCount * 20}%` }}></div>
                </div>
            </div >
            <hr className='my-10 mb-6'></hr>
        </>
    )
}

export default TopRestaurant 