import { IoArrowBackCircleOutline } from "react-icons/io5";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import React, { useContext, useEffect, useRef, useState } from 'react'
import useFetch from "../../hooks/useFetch";
import { ShimmerDiv, ShimmerText } from "shimmer-effects-react";
import { Coordinates } from "../../context/contextApi";
import { useNavigate } from "react-router-dom";

function OnYourMind() {

    const [cards, setCards] = useState([])
    const [slideCount, setSlideCount] = useState(0)
    const { coord } = useContext(Coordinates)
    // console.log(coord)

    const { data, loading, error } = useFetch(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${coord.lat}&lng=${coord.lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`)

    useEffect(() => {
        if (data && data.data) {
            setCards(data?.data?.cards[0]?.card?.card?.imageGridCards?.info)
        }
    }, [data, coord])
    const refDiv = useRef()

    const cardsLength = Math.floor(cards?.length / 5)

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

    const navigate = useNavigate()

    function handleEntityId(entityId) {
        navigate('searchbycategory/' + entityId)
    }

    function handleCurrentEntityId(entityId) {
        let partingId = entityId.split('?')[1]
        let getCurrectEntityId = new URLSearchParams(partingId)
        return getCurrectEntityId.get('collection_id')
    }
    console.log(data)
    return (
        <>
            <div className='py-5'>
                <div className='flex justify-between pb-4 '>
                    <p className='text-2xl font-bold'>Enjoy with MealVery 😍</p>
                    <div className='flex gap-1 '>
                        <div><IoArrowBackCircleOutline size={30} cursor={'pointer'} onClick={() => handlePrevSlide()} color={slideCount == 0 ? 'lightgrey' : 'black'} /></div>
                        <div><IoArrowForwardCircleOutline size={30} cursor={'pointer'} onClick={() => handleNextSlide()} color={slideCount < cardsLength ? 'black' : 'lightgrey'} /></div>
                    </div>
                </div>
            </div>
            <div className='overflow-hidden overflow-x-auto scrollbar-hide ' ref={refDiv}>
                <div className={`flex gap-4`} style={{ transform: `translateX(-${530 * slideCount}px)`, transition: '0.7s' }} >
                    {!loading ?
                        cards.map((item, idx) => {
                            return (
                                <img onClick={() => {
                                    handleEntityId(
                                        item.entityId.length < 7 ? item.entityId : handleCurrentEntityId(item.entityId)
                                    )
                                }} className='w-36 cursor-pointer ' key={item.id} src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${item.imageId}`} alt="" />
                            )
                        })
                        : (
                            <div className="flex gap-8 ">
                                {
                                    Array.from({ length: 7 }).map((_, idx) => {
                                        return (
                                            <div className="flex flex-col gap-5" key={idx}>
                                                <ShimmerDiv mode="light" height={130} width={130} rounded={50} />
                                                <ShimmerText mode="light" line={3} gap={6} />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )}
                </div>
                <hr className='my-10'></hr>
            </div>
        </>
    )
}

export default OnYourMind