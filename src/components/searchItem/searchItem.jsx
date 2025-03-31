import React, { useContext, useEffect, useState } from 'react'
import { GoArrowLeft } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Coordinates } from '../../../context/contextApi';

function SearchItem() {

    const param = useParams()
    const [query, setQuery] = useState('')
    const { coord } = useContext(Coordinates)
    const [searchData, setSearchData] = useState([])

    async function fetchDataById() {
        const response = await fetch(`https://www.swiggy.com/dapi/menu/pl/search?lat=23.0603927&lng=72.5659033&restaurantId=284335&isMenuUx4=true&query=bur&submitAction=ENTER`)
        const data = await response.json()
        console.log(data)
        if (data && data.suggestions) {
            setSearchData(data.suggestions)
        }
    }

    useEffect(() => {
        let intervalId
        if (query !== '') {
            clearTimeout(intervalId)
            intervalId = setTimeout(() => {
                fetchDataById()
            }, 500)
        }

        return (() => clearTimeout(intervalId))
    }, [param, query])
    console.log(searchData)
    return (
        <>
            <div className='w-[45%] mx-auto mt-5'>
                <div className='flex items-center searchinputMain'>
                    <GoArrowLeft size={30} color='grey' onClick={() => history.back()} cursor={'pointer'} />
                    <div className='flex-1 mx-4 w-full'>
                        <input type="text" onChange={(e) => setQuery(e.target.value)} placeholder='Search in Location' className='w-full bg-transparent outline-none border-none' />
                    </div>
                    <CiSearch size={30} color='grey' />
                </div>
                <hr />

                <div>
                    {/* <div className='flex items-center justify-between px-4'>
                        <div className='flex flex-col'>
                            <div className='flex items-center gap-2'>
                                <div>{data?.itemAttribute?.vegClassifier == 'VEG' ? < img className='max-w-4' src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Veg_symbol.svg" alt="" /> : <img className='max-w-4' src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Non_veg_symbol.svg/800px-Non_veg_symbol.svg.png' />}</div>
                                <p className='text-lg font-bold'>{data?.isBestseller ? 'Best Seller' : ''}</p>
                            </div>
                            <p className='font-bold text-xl my-1'>{data?.name}</p>
                            <div className='flex gap-2 items-end'>
                                <p className='font-medium'>₹{data.price / 100}</p>
                                <p className='text-[0.75rem] font-bold'>60% OFF USE STEALDEAL</p>
                            </div>

                            <div className='py-2 flex gap-1 items-center'>
                                <p className='text-green-700 font-bold flex items-center gap-1'><FaStar />4.4</p>
                                <p className='text-zinc-500'>(1003)</p>
                            </div>

                            <div className='max-w-lg'>
                                <p className='text-zinc-500 w-full'>
                                    {isMore ? data?.description : sortedDesc}
                                </p>
                                {data?.description?.length > 100 && (
                                    <span
                                        className='font-semibold text-zinc-700 cursor-pointer'
                                        onClick={() => setIsMore(prev => !prev)}
                                    >
                                        {isMore ? 'Less' : '...More'}
                                    </span>
                                )}
                            </div>
                        </div> */}

                    {/* <div className='flex flex-col items-center w-28 relative h-24'>
                            <img className='rounded-md w-[400px] overflow-hidden' alt="Chicken Keema Grill Sandwich" loading="lazy" src={data.imageId ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${data.imageId}` : 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png'}></img>
                            {
                                !cart.find((item) => item.id == data.id) ? <div className=' absolute  -bottom-4' onClick={handleCart}>
                                    <button className=' shadow-custom py-2 px-8 rounded-md bg-white hover:bg-gray-100 font-extrabold text-green-600' >ADD</button>
                                </div>
                                    :
                                    <div className=' absolute  -bottom-4'>
                                        <button className=' shadow-custom rounded-md bg-white font-extrabold text-green-600' >
                                            <div className='flex gap-3 items-center overflow-hidden rounded-md'>
                                                <div className=' hover:bg-gray-300 px-3 py-1 text-xl' onClick={() => dispatch(removeItem(Number(data.id)))}>−</div>
                                                <div>{
                                                    cart.map((item) => item.id == data.id && item.quantity)
                                                }</div>
                                                <div className=' hover:bg-gray-300 px-3 py-1 text-xl' onClick={() => handleMultipleAdd()}>+</div>
                                            </div>
                                        </button>
                                    </div>
                            }   
                        </div> */}
                    {/* </div> */}
                    {/* <hr className='my-9' /> */}
                </div>
            </div>

        </>
    )
}

export default SearchItem