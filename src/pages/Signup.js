import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faArrowRight, faArrowRightLong, faEnvelope, faEye, faEyeSlash, faPersonWalkingArrowRight, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Typing from "react-typing-effect";
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

function RegisterPage() {

  const navigate = useNavigate()
  const [passType, setPassType] = useState("password")

  useEffect(() => {
    if (authService.getCurrentUser()) {
      navigate("/home")
    }
  }, [])

  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: `url('/images/login_cover.jpg')` }}>
      <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-bl lg:bg-gradient-to-l from-transparent via-gray-900 to-gray-900" style={{ backdropFilter: 'blur(5px)' }}>
        <div class="h-16 mt-10 lg:mt-20 lg:ml-20 ml-0">
          <a className='flex flex-row ml-8'>
            <span className='w-8 h-8 rounded-full bg-green-500'></span>
            <span class="text-green-500 font-bold text-lg ml-3">Mitra Chat</span>
          </a>
          <form autoComplete='off' aria-autocomplete='off' className='ml-10'>
            <p class="text-gray-400 font-bold text-xs mt-20 uppercase">Start for free</p>
            <h2 className='text-white font-bold text-3xl mt-2'>
              <Typing typingDelay={50} speed={100} hideCursor={false} cursorClassName={"text-green-500"} eraseSpeed={200} text={"Create new account."} /></h2>
            <div className='flex gap-0 lg:gap-5 flex-col lg:flex-row'>
              <div class="bg-gray-800 focus-within:ring-1 ring-green-400 rounded-xl px-6 pt-1 pb-2 mt-10 lg:w-44 w-72">
                <label class="mr-4 text-gray-400 text-xs" for="username">First Name</label>
                <span class="flex">
                  <input class="bg-gray-800 rounded-lg w-full outline-none font-bold text-sm text-white capitalize" type="text" />
                  <FontAwesomeIcon className='ml-2 text-lg -mt-2 text-gray-400' icon={faAddressCard} />
                </span>
              </div>
              <div class="bg-gray-800 focus-within:ring-1 ring-green-400  rounded-xl px-6 pt-1 pb-2 mt-5 lg:mt-10 lg:w-48 w-72">
                <label class="mr-4 text-gray-400 text-xs " for="username">Last Name</label>
                <span class="flex">
                  <input class="bg-gray-800 rounded-lg w-full outline-none font-bold text-sm text-white capitalize" type="text" />
                  <FontAwesomeIcon className='ml-2 text-lg -mt-2 text-gray-400' icon={faAddressCard} />
                </span>
              </div>
            </div>
            <div class="bg-gray-800 focus-within:ring-1   ring-green-400  rounded-xl px-6 pb-2 pt-1 mt-5 w-72 lg:w-96">
              <label class="mr-4 text-gray-400 text-xs " for="username">Email</label>
              <span class="flex">
                <input class="bg-gray-800 rounded-lg w-full outline-none font-bold text-sm text-white lowercase" type="text" />
                <FontAwesomeIcon className='ml-2 text-lg -mt-2 text-gray-400' icon={faEnvelope} />
              </span>
            </div>
            <div class="bg-gray-800 focus-within:ring-1   ring-green-400  rounded-xl px-6 pb-2 pt-1 mt-5 w-72 lg:w-96">
              <label class="mr-4 text-gray-400 text-xs " for="username">Password</label>
              <span class="flex">
                <input type={passType} class="bg-gray-800 rounded-lg w-full outline-none font-bold text-sm text-white" />
                <FontAwesomeIcon onClick={() => setPassType(passType == "password" ? "text" : "password")} className='ml-2 text-lg -mt-2 text-green-400 cursor-pointer' icon={passType == "text" ? faEyeSlash : faEye} />
              </span>
            </div>
            <div className='mt-10 gap-4'>
              <button type='button' className='text-green-500 outline-none focus-within:bg-green-500 focus-within:text-black bg-gray-700 lg:px-28 px-16 text-lg hover:bg-green-500 hover:text-black  font-bold py-3 rounded-2xl'>Create account <FontAwesomeIcon className='ml-2' icon={faArrowRightLong} /></button>
              <p className='text-sm text-gray-500 mt-2 ml-1'>Already have an account? <Link to={'/login'} className='text-green-500 hover:text-green-800 font-bold '>Access your account</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
}

export default RegisterPage;
