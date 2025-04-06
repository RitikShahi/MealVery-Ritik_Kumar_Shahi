import React, { useContext, useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { ShimmerDiv, ShimmerSectionHeader } from 'shimmer-effects-react'
import Restaurant from './restaurantCard'
import FilterCompo from './FilterCompo'
import { Coordinates } from '../../context/contextApi'
import { LuSettings2 } from "react-icons/lu";
import { MdKeyboardArrowDown } from "react-icons/md";

function OnlineFoodDelivery() {
    const [cards, setCards] = useState([])
    const { coord } = useContext(Coordinates)

    const { data, loading, error } = useFetch(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${coord.lat}&lng=${coord.lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`)

    useEffect(() => {
        if (data && data.data) {
            setCards(data?.data?.cards[1].card?.card?.gridElements?.infoWithStyle?.restaurants)
        }
    }, [data, coord])


    const filterData = [
        {
            id: 3,
            name: 'Less Then 30 Min',
            filteron: false
        },

        {
            id: 6,
            name: 'Rating 4.0+',
            filteron: false
        },

        {
            id: 7,
            name: 'Pure Veg',
            filteron: false
        },

        {
            id: 8,
            name: 'Rs.300-Rs.600',
            filteron: false
        },

        {
            id: 9,
            name: 'Less than Rs.300',
            filteron: false
        },
    ]

    const [filteredOption, setFilteredOption] = useState(null)
    const [currentFilterData, setCurrentFilterData] = useState([])

    function handleFilteredOption(idx) {
        setFilteredOption(filteredOption == idx ? null : idx)
    }

    useEffect(() => {
        let showFilteredData = cards.filter((item, idx) => {
            console.log(item)
            switch (filteredOption) {
                case 'Rating 4.0+': return item?.info?.avgRating > 4 ? item : ''
                case 'Pure Veg': return item?.info?.veg
                case 'Less Then 30 Min': return item?.info?.sla?.deliveryTime < 30
                case 'Rs.300-Rs.600': return item?.info?.costForTwo.slice(1, 4) >= '300' && item?.info?.costForTwo.slice(1, 4) <= '600'
                case 'Less than Rs.300': return item?.info?.costForTwo.slice(1, 4) <= '300'
            }
        })
        setCurrentFilterData(showFilteredData)
    }, [filteredOption])

    return (
        <>
            <div >
                <h2 className='text-[1.6rem] font-bold capitalize baap'>Restaurants with online food delivery in {(data?.data?.cards[11]?.card?.card?.citySlug)}</h2>

                <FilterCompo filterData={filterData} handleFilteredOption={handleFilteredOption} filteredOption={filteredOption} />

                <div className='grid grid-cols-4 gap-x-2 mt-6 gap-y-9'>
                    {!loading ?
                        currentFilterData.length > 0 ? currentFilterData.map((item, idx) => {
                            return (
                                <Restaurant key={item.info.id} item={item} />
                            )
                        }) :
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
        </>
    )
}

export default OnlineFoodDelivery   