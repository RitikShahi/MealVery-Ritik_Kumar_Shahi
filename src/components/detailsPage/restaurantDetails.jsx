import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaStar } from 'react-icons/fa6'
import { CiSearch } from "react-icons/ci";
import { Link, useParams } from 'react-router-dom';
import { IoArrowBackCircleOutline, IoArrowForwardCircleOutline } from 'react-icons/io5';
import AccordianCompo from '../AccordianCompo';
import { BsBookmarksFill } from "react-icons/bs";
import { Coordinates } from '../../../context/contextApi';
import { useDispatch, useSelector } from 'react-redux';
import { addMultiple, addTocart, removeItem } from '../../../redux/cartSlice';
import RestaurantChange from '../restaurantChangePopup/restaurantChange';
import { ShimmerDiv, ShimmerText, ShimmerTitle } from 'shimmer-effects-react';

function RestaurantDetails() {

    const param = useParams()
    const [slideCount, setSlideCount] = useState(0)
    const [mainData, setMainData] = useState([])
    const [maxOfferLength, setMaxOfferLength] = useState()
    const [offerDivWidth, setOfferDivWidth] = useState()

    const [topPickLength, setTopPickLength] = useState(0)
    const [topPickCount, setTopPickCount] = useState(0)
    const { coord } = useContext(Coordinates)

    const [loading, setLoading] = useState(false)

    async function fetchDataById() {
        setLoading(true)
        const response = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${coord.lat}&lng=${coord.lng}&restaurantId=${param.id}&catalog_qa=undefined&submitAction=ENTER`)
        const data = await response.json()
        if (data?.data?.cards) {
            setMainData(data?.data?.cards)
        }
        setLoading(false)
    }

    const divRef = useRef()

    useEffect(() => {
        fetchDataById()
    }, [param, coord])

    useEffect(() => {
        const showPerSlide = mainData[3]?.card?.card?.gridElements?.infoWithStyle?.offers.length;

        if (divRef && divRef.current) {
            setOfferDivWidth(divRef.current.offsetWidth / 2);
        }

        if (showPerSlide) {
            const mainLength = Math.ceil(mainData[3]?.card?.card?.gridElements?.infoWithStyle?.offers.length / 2)
            setMaxOfferLength(mainLength);
        } else {
            setMaxOfferLength(0);
        }
    }, [mainData, divRef]);


    function handleNextItem() {
        if (maxOfferLength + 1 > slideCount) {
            setSlideCount(prev => prev + 1)
        } else {
            setSlideCount(0)
            return
        }
    }

    function handlePrevItem() {
        if (slideCount < 0 || slideCount == 0) {
            return
        } else {
            setSlideCount(prev => prev - 1)
        }
    }

    const topPickRef = useRef()

    useEffect(() => {
        const totalLength = mainData[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.carousel?.length
        if (totalLength) {
            setTopPickLength(totalLength)
        }

        // console.log(mainData[2]?.card?.card?.info)
    }, [mainData])

    function handleTopPickCount() {
        if (topPickLength > topPickCount) {
            setTopPickCount(prev => prev + 1)
        } else {
            return
        }
    }

    function handleTopPickPrev() {
        if (topPickCount < 0 || topPickCount == 0) {
            return
        } else {
            setTopPickCount(prev => prev - 1)
        }
    }

    const cart = useSelector((state) => state.cart)
    const dispatch = useDispatch()
    // console.log(mainData)
    return (
        <>
            <div className='w-[45vw] mx-auto'>
                {
                    cart.map((item) => item.restaurantChange && <RestaurantChange resId={item.resId} />)
                }
                <div className='mt-10'>
                    <h2 className='text-2xl font-extrabold'>{!loading ? mainData[0]?.card?.card?.text : <ShimmerTitle mode="light" line={1} className='mb-8 w-28' />}</h2>
                </div>

                {!loading ? <div className='shadow-custom mt-6 py-4 px-5 rounded-3xl'>
                    <div className='flex gap-2 items-center font-bold '>
                        <div className='bg-green-700 w-[20px] h-[20px] flex items-center justify-center rounded-full'>
                            <FaStar color='white' size={14} />
                        </div>
                        <p>{mainData[2]?.card?.card?.info?.avgRating}({mainData[2]?.card?.card?.info?.totalRatingsString})</p>
                        <div className='font-semibold'>•</div>
                        <p>{mainData[2]?.card?.card?.info?.costForTwoMessage}</p>
                    </div>

                    <div>
                        <p className='text-sm  text-orange-500 underline font-bold pt-1'>{mainData[2]?.card?.card?.info?.cuisines.join(',')}</p>
                    </div>

                    <div className='flex flex-col gap-2 mt-3'>
                        <div className='flex gap-3 items-center'>
                            <p className='font-bold'>Outlet</p>
                            <p className='text-gray-600 text-sm'>{mainData[2]?.card?.card?.info.locality},{mainData[2]?.card?.card?.info.city}</p>
                        </div>

                        <div>
                            <p className='font-bold'>30-45 mins</p>
                        </div>
                        <hr className='mt-3' />
                    </div>

                    <div className='max-w-60'>
                        <div className='mt-2 text-gray-600 flex justify-between items-center text-sm'>
                            <p className='font-medium' dangerouslySetInnerHTML={{ __html: mainData[2]?.card?.card?.info?.feeDetails?.message }}></p>
                        </div>
                    </div>
                </div> : (
                    <div className='mt-5'>
                        <ShimmerDiv mode="light" height={170} width={690} rounded={1} />
                    </div>
                )}

                < div className='mt-8 pl-3'>
                    <h2 className='text-[1.4rem] font-bold'>{!loading ? 'Deals for you' : <ShimmerTitle mode="light" line={1} className='mb-8' />}</h2>
                    <div className='flex gap-1 justify-end'>
                        <div>
                            <IoArrowBackCircleOutline
                                size={30}
                                cursor='pointer'
                                color={slideCount === 0 ? 'lightgrey' : 'black'}
                                onClick={handlePrevItem}
                            />
                        </div>
                        <div>
                            <IoArrowForwardCircleOutline
                                size={30}
                                cursor='pointer'
                                color={slideCount < maxOfferLength && maxOfferLength !== 2 || maxOfferLength > 0 ? 'black' : 'lightgrey'}
                                onClick={handleNextItem}
                            />
                        </div>
                    </div>

                    {!loading ? <div className='max-w-2xl mt-3 overflow-hidden overflow-x-auto scrollbar-hide' ref={divRef}>
                        <div className='flex gap-5 transition-all' style={{ transform: `translateX(-${offerDivWidth * slideCount}px)` }}>
                            {mainData[3]?.card?.card?.gridElements?.infoWithStyle?.offers.map((offer, idx) => {
                                return (
                                    <div
                                        key={idx}
                                        className='shadow-custom rounded-2xl w-96 py-2 px-3 flex gap-4 items-center flex-shrink-0'
                                    >
                                        <div className='w-[3.4rem] h-[3.4rem] overflow-hidden '>
                                            <img
                                                className='w-full h-full object-cover'
                                                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/${offer.info.offerLogo}`}
                                                alt={offer.info.header}
                                            />
                                        </div>
                                        <div className='flex flex-col'>
                                            <p className='font-extrabold text-[1.1rem]'>{offer.info.header}</p>
                                            <p className='font-bold text-zinc-500 text-[0.9rem]'>{offer.info.description}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                        : (
                            <div className='flex gap-4 overflow-hidden mt-3'>
                                <ShimmerDiv mode="light" height={70} width={370} />
                                <ShimmerDiv mode="light" height={70} width={370} />
                            </div>
                        )
                    }
                </div>

                {!loading ? <div className='mt-8 flex justify-center items-center gap-1'>
                    <div>♨︎</div>
                    <p>MENU</p>
                    <div>♨︎</div>
                </div>
                    :
                    (
                        <div className='flex justify-center'>
                            <ShimmerText mode="light" line={1} className='mt-8 w-24' />
                        </div>
                    )
                }


                {!loading ? <Link to={`/searchItem/${mainData[2]?.card?.card?.info?.id}`} className='cursor-pointer rounded-lg flex items-center justify-between mt-4 bg-gray-100 p-[0.70rem]'>
                    <div></div>
                    <p className='font-semibold text-[1rem] text-zinc-500'>Search For Food</p>
                    <CiSearch size={22} className='text-zinc-500' />
                </Link>
                    :
                    (
                        <ShimmerDiv mode="light" height={50} width={690} className='my-3' />
                    )
                }

                <div className='mt-4 flex gap-4'>
                    {!loading ? <div className='shadow-custom w-fit px-2 py-1 rounded-full cursor-pointer'>
                        <p className='text-green-500 font-semibold'>Pure Veg</p>
                    </div> :
                        (
                            <ShimmerDiv mode="light" className='w-20' rounded={2} />
                        )
                    }

                    {!loading ? <div className='shadow-custom w-fit px-2 py-1 rounded-full cursor-pointer'>
                        <p className='text-black font-semibold'>Bestseller</p>
                    </div>
                        :
                        (
                            <ShimmerDiv mode="light" className='w-20 h-8' rounded={2} />
                        )
                    }
                </div>

                <hr className='my-7' />

                <div>
                    {mainData[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.carousel?.length > 0 && <div className='flex items-center justify-between'>
                        <h2 className='text-[1.2rem] font-bold'>Top Picks</h2>
                        <div className='flex gap-1'>
                            <div><IoArrowBackCircleOutline size={30} cursor={'pointer'} color={topPickCount == 0 ? 'lightgrey' : 'black'} onClick={handleTopPickPrev} /></div>
                            <div><IoArrowForwardCircleOutline size={30} cursor={'pointer'} color={topPickCount < topPickLength ? 'black' : 'lightgrey'} onClick={handleTopPickCount} /></div>
                        </div>
                    </div>}

                    <div className='overflow-hidden overflow-x-scroll mt-7 scrollbar-hide' ref={topPickRef} >
                        <div className='flex gap-7 transition-all' style={{ transform: `translateX(-${(divRef?.current?.offsetWidth / topPickLength) * topPickCount}px)` }}>
                            {
                                mainData[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.carousel?.map((item, idx) => {
                                    return (
                                        <div className='flex-shrink-0 relative ' key={idx}>
                                            <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300/${item.creativeId}`} alt="Image 1" />
                                            <div className='w-[18.2rem] px-5 absolute bottom-4 flex items-center justify-between'>
                                                <p className='text-[white] font-semibold'>₹{item.dish.info.price / 100}</p>
                                                {
                                                    !cart.find((prod) => prod.id == item?.dish?.info?.id) ? <div className=' absolute right-3' onClick={() => dispatch(addTocart({ ...item?.dish?.info, resId: param.id, nameOfRes: mainData[0]?.card?.card?.text, LocalityOfRes: mainData[2]?.card?.card?.info.locality }))}>
                                                        <button className=' shadow-custom py-2 px-8 rounded-md bg-white hover:bg-gray-100 font-extrabold text-green-600'>ADD</button>
                                                    </div>
                                                        :
                                                        <div className=' absolute  -bottom-0 right-3'>
                                                            <button className=' shadow-custom rounded-md bg-white font-extrabold text-green-600' >
                                                                <div className='flex gap-3 items-center overflow-hidden rounded-md'>
                                                                    <div className=' hover:bg-gray-300 px-3 py-1 text-xl' onClick={() => dispatch(removeItem(Number(item?.dish?.info?.id)))}>−</div>
                                                                    <div>{
                                                                        cart.map((data) => data.id == item?.dish?.info?.id && data.quantity)
                                                                    }</div>
                                                                    <div className=' hover:bg-gray-300 px-3 py-1 text-xl' onClick={() => dispatch(addMultiple(item?.dish?.info?.id))}>+</div>
                                                                </div>
                                                            </button>
                                                        </div>
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div>
                        <div className='border-t-[18px] mt-10 '>
                            {
                                mainData[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.map((item, idx) => {
                                    // console.log(item)
                                    return (
                                        idx >= 2 && idx <= 17 && (
                                            <AccordianCompo card={item} key={idx} idx={idx} totalLength={mainData[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.length} resName={mainData[0]?.card?.card?.text} resLocation={mainData[2]?.card?.card?.info.locality} />
                                        )
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className='bg-gray-100 w-full h-96 p-5 text-zinc-400'>
                        <div className='flex items-center gap-3'>
                            <div>
                                <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_120,h_60/fssai_final_edss9i" alt="" className='w-16' />
                            </div>

                            <div>
                                <p >License No. 11521005000868</p>
                            </div>
                        </div>
                        <div className='my-4'>
                            <hr className=' bg-zinc-900' />
                        </div>

                        <div>
                            <p className='font-semibold'>{mainData[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[mainData[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.length - 1]?.card?.card?.name}</p>
                            <p className='text-sm'>(Outlet:{mainData[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[mainData[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.length - 1]?.card?.card?.area})</p>

                            <p className='mt-6 text-sm'>
                                {mainData[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[mainData[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.length - 1]?.card?.card?.completeAddress}</p>
                        </div>

                        <div className='my-4'>
                            <hr className=' bg-zinc-900' />
                        </div>

                        <div className='text-center text-sm'>
                            <p className='font-bold text-black'>For better experience, download the MealVery app now</p>
                        </div>

                        <div className='flex gap-4 justify-center items-center mt-4'>
                            <a href='https://github.com/RitikShahi' className=' cursor-pointer'>
                                <img className='w-40' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/play_store.png" alt="" />
                            </a>
                            <a href='https://github.com/RitikShahi' className=' cursor-pointer'>
                                <img className='w-40' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/app_store.png" alt="" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className='roundMenu flex justify-center items-center cursor-pointer'>
                    <div className='flex flex-col justify-center items-center gap-1'>
                        <BsBookmarksFill color='white' size={22} className='text-center' />
                        <p className='font-semibold text-sm menuList'>MENU</p>
                    </div>
                </div>
            </div >
        </>
    )
}

export default RestaurantDetails