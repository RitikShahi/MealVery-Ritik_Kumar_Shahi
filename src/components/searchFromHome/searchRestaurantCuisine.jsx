import React, { useContext, useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { useNavigate, useParams } from 'react-router-dom';
import { Coordinates } from '../../../context/contextApi';
import { RxCross2 } from "react-icons/rx";
import Dishes from './dishes';
import Restaurant from './restaurant';
import { IoIosArrowBack } from "react-icons/io";

function SearchRestaurantCuisine() {
    const param = useParams()
    const [query, setQuery] = useState('')
    const { coord } = useContext(Coordinates)
    const [searchData, setSearchData] = useState([])
    const [cuisine, setCuisine] = useState([])
    const [clickedProductData, setClickedProductData] = useState([])
    const [loading, setLoading] = useState(false)
    const [pendingSearch, setPendingSearch] = useState(false)

    async function fetchDataById() {
        setPendingSearch(true)
        const response = await fetch(`https://www.swiggy.com/dapi/restaurants/search/suggest?lat=${coord.lat}&lng=${coord.lng}&str=${query}&trackingId=null&includeIMItem=true`)
        const { data } = await response.json()
        if (data && data.suggestions) {
            setSearchData(data.suggestions)
        }
        setPendingSearch(false)
    }

    useEffect(() => {
        let intervalId
        if (query !== '') {
            clearTimeout(intervalId)
            setClickedProductData([])
            intervalId = setTimeout(() => {
                fetchDataById()
            }, 500)
        }
        return (() => clearTimeout(intervalId))
    }, [param, query])

    async function fetchCuisines() {
        const response = await fetch(`https://www.swiggy.com/dapi/landing/PRE_SEARCH?lat=${coord.lat}&lng=${coord.lng}`)
        const { data } = await response.json()
        if (data && data.cards && data.cards.length) {
            setCuisine(data.cards)
        }
    }
    useEffect(() => {
        fetchCuisines()
    }, [param])

    const [checkDishes, setCheckDishes] = useState(false)

    function handleSeachedProduct(prodName, checkDishRes) {
        setQuery(prodName)
        if (checkDishRes == 'Restaurant') {
            setCheckDishes(false)
        } else {
            setCheckDishes(true)
        }

        async function fetchItemDataByName() {
            setLoading(true)
            const response = await fetch(`https://www.swiggy.com/dapi/restaurants/search/v3?lat=${coord.lat}&lng=${coord.lng}&str=${prodName}&trackingId=982a37e2-d6ea-f8d5-8fcc-f6f6551830a2&submitAction=ENTER&queryUniqueId=08cf5c4f-b2a0-d11d-554e-6e010f1126a1`)
            const { data } = await response.json()
            if (data && data.cards) setClickedProductData(data.cards)
            setLoading(false)
        }
        fetchItemDataByName()
    }

    function handleCuisineName(entityId) {
        const getNameQuery = entityId.split('?')[1]
        const getName = new URLSearchParams(getNameQuery).get('query')
        setQuery(getName)
    }

    console.log(clickedProductData)
    const navigate = useNavigate()

    function goToSearchPageBack() {
        navigate('/restaurantcuisine')
        setQuery('')
        setClickedProductData([])
    }

    return (
        <>
            <div className='w-[52%] mx-auto mt-5 max-h-[595px] overflow-hidden'>
                <div className='flex items-center border py-[0.35rem] px-4'>
                    {/* <GoArrowLeft size={30} color='grey' /> */}
                    <div className='flex w-full items-center gap-1'>
                        {clickedProductData && clickedProductData.length > 0 && <IoIosArrowBack size={20} cursor={'pointer'} onClick={() => goToSearchPageBack()} />}
                        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Search in Location' className='w-full bg-transparent outline-none border-none' />
                    </div>
                    {!query.length > 0 ? <CiSearch size={30} color='grey' /> : <RxCross2 size={30} color='gray' cursor={'pointer'} onClick={() => setQuery('')} />}
                </div>
                {
                    !query.length > 0 ? (
                        <div>
                            <h3 className='mt-8 mb-4 font-bold text-xl text-zinc-700'>Popular Cuisines</h3>
                            <div className='flex overflow-x-auto scrollbar-hide'>
                                {
                                    cuisine[1]?.card?.card?.imageGridCards?.info.map((item, idx) => {
                                        // console.log(item)
                                        return (
                                            <div key={idx} className='w-24 cursor-pointer flex-shrink-0' onClick={() => handleCuisineName(item.entityId)}>
                                                <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/${item?.imageId}`} alt="" />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    ) :
                        (
                            <div className='h-[555px] overflow-y-auto scrollbar-hide'>
                                {
                                    !clickedProductData.length > 0 ? (
                                        !pendingSearch ? searchData && searchData.length && searchData.map((item, idx) => {
                                            return (
                                                <div onClick={() => handleSeachedProduct(item.text, item.tagToDisplay)} key={item.idx} className='flex items-center mt-6 gap-3 hover:bg-blue-100 p-2 cursor-pointer' >
                                                    <img className='w-20 rounded-md' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_112,h_112,c_fill/${item.cloudinaryId}`} alt="" />
                                                    <div>
                                                        <p className='text-base'>{item.text}</p>
                                                        <p className='text-zinc-500 capitalize text-sm'>{item.tagToDisplay}</p>
                                                    </div>
                                                </div>
                                            )
                                        }) : <div class="spinner absolute left-[50%] top-[50%]">
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                        </div>
                                    ) : (
                                        <div>
                                            <div className='flex gap-3 my-4'>
                                                <div className={`rounded-full ${!checkDishes ? 'bg-zinc-800 text-white ' : 'bg-white text-zinc-800'} border py-1 px-3 text-sm font-bold cursor-pointer`} onClick={() => setCheckDishes(false)}>Restaurant</div>
                                                <div className={`rounded-full ${checkDishes ? 'bg-zinc-800 text-white' : 'text-zinc-800 bg-white'} border py-1 px-3 text-sm font-bold cursor-pointer`} onClick={() => setCheckDishes(true)}>Dishes</div>
                                            </div>
                                            <div className='p-4 grid grid-cols-2 bg-gray-100 gap-5'>
                                                {
                                                    checkDishes ? (!loading ? clickedProductData[1]?.groupedCard?.cardGroupMap?.DISH?.cards?.map((item, idx) => {
                                                        if (idx == 0) {
                                                            return
                                                        }
                                                        return (
                                                            <Dishes item={item} key={idx} />
                                                        )
                                                    }) : <div class="spinner absolute left-[50%] top-[50%]">
                                                        <div></div>
                                                        <div></div>
                                                        <div></div>
                                                        <div></div>
                                                        <div></div>
                                                        <div></div>
                                                    </div>) : (!loading ? clickedProductData[1]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards[1]?.card?.card?.restaurants?.map((item, idx) => {
                                                        // if (idx == 0) {
                                                        //     return
                                                        // }
                                                        return (
                                                            <Restaurant item={item} key={idx} />
                                                        )
                                                    }) : <div class="spinner absolute left-[50%] top-[50%]">
                                                        <div></div>
                                                        <div></div>
                                                        <div></div>
                                                        <div></div>
                                                        <div></div>
                                                        <div></div>
                                                    </div>)
                                                }
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        )
                }


            </div >

        </>
    )
}

export default SearchRestaurantCuisine