import React, { useContext, useEffect, useRef, useState } from 'react';
import { MdKeyboardArrowDown } from "react-icons/md";
import { RiBuilding2Line } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";
import { BiSolidOffer } from "react-icons/bi";
import { IoMdHelpBuoy } from "react-icons/io";
import { FaRegUser } from "react-icons/fa6";
import { BsMinecart } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { RxCross1 } from "react-icons/rx";
import { SlTarget } from "react-icons/sl";
import { GrLocation } from "react-icons/gr";
import { Coordinates } from '../../context/contextApi';
import { useDispatch, useSelector } from 'react-redux';
import ModelPortal from './signInSlider/modelPortal';
import LoginSlider from './signInSlider/loginSlider';
import SignUpSlider from './signInSlider/signUpSlider';
import LoginUserSlider from './signInSlider/loginUserSlider';
import { signOut } from 'firebase/auth';
import { auth } from '../../auth/firebaseAuth';
import { addUser, removeUser } from '../../redux/userSlice';
import { motion } from 'framer-motion';

function Header() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [locationQuery, setLocationQuery] = useState('');
  const [locationData, setLocationData] = useState([]);
  const { setCoord } = useContext(Coordinates);
  const [getCurrentLocation, setGetCurrentLocation] = useState({});
  const cart = useSelector((state) => state.cart);

  const navbarData = [
    {
      name: 'Search',
      image: <IoIosSearch size={22} />,
      path: 'restaurantcuisine'
    },
    {
      name: 'Help',
      image: <IoMdHelpBuoy size={19} />
    },
    {
      name: 'Sign In',
      image: <FaRegUser />
    },
    {
      name: 'Cart',
      image: <BsMinecart size={20} />,
      path: '/cart'
    },
  ];

  // State for tooltip on Help
  const [showToll, setShowToll] = useState(false);

  useEffect(() => {
    toggleMenu ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'auto';
  }, [toggleMenu]);

  const divRef = useRef();
  const loactionBtn = useRef();
  const cancelToggleInput = useRef();

  useEffect(() => {
    function handleClickOutside(e) {
      if (!divRef.current || divRef.current.contains(e.target)) return;
      if (!loactionBtn.current || loactionBtn.current.contains(e.target)) return;
      if (!cancelToggleInput.current || cancelToggleInput.current.contains(e.target)) return;
      setToggleMenu(false);
    }
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [toggleMenu]);

  async function fetchLoctionByQuery() {
    if (locationQuery !== '' && locationQuery.length > 2) {
      const response = await fetch(`https://www.swiggy.com/dapi/misc/place-autocomplete?input=${locationQuery}&types=`);
      const data = await response.json();
      if (data?.data) {
        setLocationData(data.data);
      }
    } else {
      setLocationData([]);
    }
  }

  useEffect(() => {
    let intervalId;
    clearInterval(intervalId);
    intervalId = setTimeout(() => {
      fetchLoctionByQuery();
    }, 500);
    return () => clearTimeout(intervalId);
  }, [locationQuery]);

  const [addressSelected, setAddressSelected] = useState('');

  async function fetchLanLng(placeId) {
    const response = await fetch(`https://www.swiggy.com/dapi/misc/address-recommend?place_id=${placeId}`);
    const data = await response.json();
    setCoord(data?.data[0]?.geometry?.location);
    setAddressSelected(data?.data?.[0]?.formatted_address);
  }

  function handleLatLng(placeId) {
    fetchLanLng(placeId);
    setToggleMenu(false);
  }

  useEffect(() => {
    async function fetchDataByLng() {
      let response = await fetch(`https://www.swiggy.com/dapi/misc/address-recommend?latlng=${getCurrentLocation?.lat}%2C${getCurrentLocation?.lng}`);
      let data = await response.json();
      setAddressSelected(data?.data?.[0]?.formatted_address);
    }
    fetchDataByLng();
    setToggleMenu(false);
  }, [getCurrentLocation]);

  function getUserLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGetCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setCoord({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      }
    );
  }

  function handleCancel() {
    setLocationQuery('');
    locationData([]);
  }

  const [signInModel, setSignInModel] = useState(false);
  const [signInorLogin, setSignInOrLogin] = useState(true);

  function closeSignInModel() {
    setSignInModel(false);
  }

  function handleCreateAccount() {
    setSignInOrLogin(false);
  }

  function handleLoginAccount() {
    setSignInOrLogin(true);
  }

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  async function logoutUser() {
    try {
      await signOut(auth);
      dispatch(removeUser(null));
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  }

  const variants = {
    hidden: { x: '-100%', opacity: 0 },
    visible: { x: '0%', opacity: 1 },
    exit: { x: '-100%', opacity: 0 }
  };

  return (
    <>
      {toggleMenu && (
        <ModelPortal>
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.2 }}
            className="w-[30%] bg-white h-full absolute left-0 top-0 z-10 overflow-y-auto px-9 py-5"
            ref={divRef}
          >
            <RxCross1 size={25} onClick={() => setToggleMenu(false)} cursor={'pointer'} />
            <div className="mt-10">
              <div className="bg-white w-[90%] flex relative">
                <input
                  type="text"
                  placeholder="Search for area,street Name"
                  value={locationQuery}
                  className="w-full px-5 pr-[5.2rem] py-3 inputToggle outline-none relative"
                  onChange={(e) => setLocationQuery(e.target.value)}
                />
                {locationQuery.length > 0 && (
                  <p
                    className="absolute right-3 top-3 font-semibold text-orange-600 cursor-pointer"
                    ref={cancelToggleInput}
                    onClick={() => handleCancel()}
                  >
                    Cancel
                  </p>
                )}
              </div>

              <div className="text-white px-5">
                {locationData && locationData.length
                  ? locationData.map((item, idx) => {
                      return (
                        <div
                          key={idx}
                          className="border-b-2 border-dotted border-gray-600 py-6 group cursor-pointer"
                          onClick={() => handleLatLng(item.place_id)}
                        >
                          <div className="flex gap-4 items-center mb-3 text-black">
                            <GrLocation color="black" size={20} />
                            <h3 className="group-hover:text-orange-600 font-semibold">
                              {item.structured_formatting.main_text}
                            </h3>
                          </div>
                          <p className="pl-9 text-black">
                            {item.structured_formatting.secondary_text}
                          </p>
                        </div>
                      );
                    })
                  : null}
              </div>

              {locationData.length < 0 || locationQuery === '' && (
                <div className="text-white group border mt-7 w-[90%] py-3 px-5 cursor-pointer">
                  <div className="flex gap-4 items-center mb-3">
                    <SlTarget color="black" size={20} />
                    <h3
                      className="group-hover:text-orange-600 font-semibold text-black"
                      onClick={getUserLocation}
                    >
                      Get Current Loction
                    </h3>
                  </div>
                  <p className="ml-[2.30rem] text-sm text-gray-500">Using GPS</p>
                </div>
              )}
            </div>
          </motion.div>
        </ModelPortal>
      )}

      <div className="w-full shadow-lg h-18 p-3 relative bg-black">
        {signInModel ? (
          <ModelPortal>
            {user.userInfo !== null ? (
              <LoginUserSlider closeSignInModel={closeSignInModel} logoutUser={logoutUser} />
            ) : signInorLogin ? (
              <LoginSlider closeSignInModel={closeSignInModel} handleCreateAccount={handleCreateAccount} />
            ) : (
              <SignUpSlider closeSignInModel={closeSignInModel} handleLoginAccount={handleLoginAccount} />
            )}
          </ModelPortal>
        ) : null}
        <div className="w-[80%] mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <p className="font-bold text-lg text-white mr-3">MealVery</p>
              <Link to="/">
                <img src="/header/swiggy.svg" alt="" className="w-9" />
              </Link>
              <div
                className="flex items-center cursor-pointer"
                onClick={() => setToggleMenu(true)}
                ref={loactionBtn}
              >
                <p className="font-bold text-white border-b-2 border-white ml-12 mr-3">Other</p>
                <p className="text-sm text-zinc-500">
                  {addressSelected?.length > 30
                    ? addressSelected?.slice(0, 36) + '...'
                    : addressSelected}
                </p>
                <MdKeyboardArrowDown color="orange" size={27} />
              </div>
            </div>

            <div className="flex items-center gap-9 text-white mr-3">
              {navbarData.map((item, idx) => {
                if (item.name === 'Help') {
                  return (
                    <div
                      key={idx}
                      className="relative flex items-center gap-1 font-semibold cursor-pointer"
                      onMouseEnter={() => setShowToll(true)}
                      onMouseLeave={() => setShowToll(false)}
                    >
                      {item.image}
                      <p className="hover:text-[#fc8019] text-[16px]">{item.name}</p>
                      {showToll && (
                        <div className="absolute top-full left-0 mt-2 px-4 py-2 bg-white text-black text-sm rounded-md shadow-md whitespace-nowrap">
                          Toll No: 1800 123 123
                        </div>
                      )}
                    </div>
                  );
                }
                if (item.name === 'Sign In') {
                  return (
                    <Link
                      to={item.path}
                      key={idx}
                      className="flex items-center gap-1 font-semibold cursor-pointer"
                      onClick={() => item.name === 'Sign In' && setSignInModel(true)}
                    >
                      {user.userInfo !== null ? (
                        <img className="w-10 rounded-full" src={user.userInfo.img} alt="" />
                      ) : (
                        item.image
                      )}
                      <p className="hover:text-[#fc8019] text-[16px]">
                        {user.userInfo !== null ? user.userInfo.name : item.name}
                      </p>
                      {item.name === 'Cart' && (
                        <div className="ml-2">
                          {cart.map((item) => item.quantity).reduce((acc, curr) => acc + curr, 0)}
                        </div>
                      )}
                    </Link>
                  );
                }
                return (
                  <Link to={item.path} key={idx} className="flex items-center gap-1 font-semibold cursor-pointer">
                    {item.image}
                    <p className="hover:text-[#fc8019] text-[16px]">{item.name}</p>
                    {item.name === 'Cart' && (
                      <div className="ml-2">
                        {cart.map((item) => item.quantity).reduce((acc, curr) => acc + curr, 0)}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
