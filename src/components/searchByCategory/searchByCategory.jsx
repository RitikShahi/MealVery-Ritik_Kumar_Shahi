import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Coordinates } from '../../../context/contextApi'
import { RxCross1 } from 'react-icons/rx'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { LuSettings2 } from 'react-icons/lu'
import Restaurant from '../restaurantCard'
import { IoIosArrowBack } from "react-icons/io";
import FilterCompo from '../FilterCompo'

function SearchByCategory() {

    const { coord } = useContext(Coordinates)
    const entityId = useParams()
    const [data, setData] = useState([])

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

    async function handleFetchDatabyId() {
        const response = await fetch(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${coord.lat}&lng=${coord.lng}&collection=${entityId.entityid}&tags=layout_CCS_Pizza&sortBy=&filters=&type=rcv2&offset=0&page_type=null`)
        const { data } = await response.json()

        if (data && data.cards && data.cards.length) {
            setData(data?.cards)
        }
    }

    const [currentFilterData, setCurrentFilterData] = useState([])
    const [filteredOption, setFilteredOption] = useState(null)

    useEffect(() => {
        handleFetchDatabyId()
    }, [entityId, coord])

    function handleFilteredOption(name) {
        setFilteredOption(filteredOption == name ? null : name)
    }

    useEffect(() => {
        let showFilteredData = data.filter((item, idx) => {
            if (idx < 3) {
                return
            }
            console.log(item)
            switch (filteredOption) {
                case 'Rating 4.0+': return item?.card?.card?.info?.avgRating > 4 ? item : ''
                case 'Pure Veg': return item?.card?.card?.info?.veg
                case 'Less Then 30 Min': return item?.card?.card?.info?.sla?.deliveryTime < 30
                case 'Rs.300-Rs.600': return item?.card?.card?.info?.costForTwo.slice(1, 4) >= '300' && item?.card?.card?.info?.costForTwo.slice(1, 4) <= '600'
                case 'Less than Rs.300': return item?.card?.card?.info?.costForTwo.slice(1, 4) <= '300'
            }
        })
        console.log(showFilteredData)
        setCurrentFilterData(showFilteredData)
    }, [filteredOption])

    return (
        <div className='max-w-7xl mx-auto mt-8 mb-5'>
            <div className='flex items-center gap-5'>
                <IoIosArrowBack size={35} className='text-gray-600 cursor-pointer' onClick={() => history.back()} />
                <h1 className='text-4xl font-bold text-gray-700 capitalize'>{data && data[0]?.card?.card?.title}</h1>
            </div>
            <p className='my-4 capitalize text-gray-600 text-lg'>{data && data[0]?.card?.card?.description}</p>

            <div className='flex items-center gap-2'>
                <FilterCompo filterData={filterData} filteredOption={filteredOption} handleFilteredOption={handleFilteredOption} />
            </div>
            <div>
                <p className='mt-3 mb-8 font-bold text-2xl text-gray-800'>Restaurants to explore</p>

                <div className='grid grid-cols-4 gap-y-5'>
                    {
                        currentFilterData.length > 0 ? currentFilterData.map((item, idx) => {
                            return (
                                <Restaurant item={item?.card?.card} />
                            )
                        }) :
                            data && data.length && data.map((item, idx) => {
                                if (idx < 3) {
                                    return
                                }
                                return (
                                    <Restaurant item={item?.card?.card} />
                                )
                            })
                    }
                </div>
            </div>
        </div>
    )
}

export default SearchByCategory