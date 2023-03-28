import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong, faEnvelope, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Typing from "react-typing-effect";
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService'

function LoginPage() {

  const navigate = useNavigate()
  const [passType, setPassType] = useState("password")
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (authService.getCurrentUser()){
      navigate("/home")
    }
  }, [])

  const onLogin = (e)=>{
    e.preventDefault()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    const email = e.target[0]
    const password = e.target[1]
    if (!emailRegex.test(email.value)){
      setErrors({email: "Invalid Email Address."})
    }
    if (!passwordRegex.test(password.value)){
      setErrors({password: "Weak password.."})
    }
  }

  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: `url('/images/login_cover.jpg')` }}>
      <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-bl lg:bg-gradient-to-l from-transparent via-gray-900 to-gray-900" style={{ backdropFilter: 'blur(5px)' }}>
        <div className="h-16 mt-10 lg:mt-20 lg:ml-20 ml-0">
          <a className='flex flex-row ml-8'>

            <span className='w-8 h-8 rounded-full bg-green-500'></span>

            <span className="text-green-500 font-bold text-lg ml-3">Mitra Chat</span>
          </a>
          <form onSubmit={onLogin}  className='ml-10 mt-20'>
            <h2 className='text-white font-bold text-3xl mt-2'>
              <Typing typingDelay={50} speed={100} cursorClassName={"text-green-500"} text={"Welcome Back."} /></h2>
            <div className="bg-gray-800 focus-within:ring-1   ring-green-400  rounded-xl px-6 pb-2 pt-1 mt-10 w-72 lg:w-96">
              <label className="mr-4 text-gray-400 text-xs " htmlFor="username">Email</label>
              <span className="flex">
                <input required id='email' className=" bg-gray-800 rounded-lg w-full outline-none font-bold text-sm text-white lowercase" type="email" />
                <FontAwesomeIcon className='ml-2 text-lg -mt-2 text-gray-400' icon={faEnvelope} />
              </span>
            </div>
            <div className="bg-gray-800 focus-within:ring-1   ring-green-400  rounded-xl px-6 pb-2 pt-1 mt-5 w-72 lg:w-96">
              <label className="mr-4 text-gray-400 text-xs " htmlFor="username">Password</label>
              <span className="flex">
                <input required type={passType} className="bg-gray-800 rounded-lg w-full outline-none font-bold text-sm text-white" />
                <FontAwesomeIcon onClick={()=>setPassType(passType == "password"?"text":"password")} className='ml-2 text-lg -mt-2 text-green-400 cursor-pointer' icon={passType == "text" ? faEyeSlash : faEye} />
              </span>
            </div>
            <button type='submit' className='text-green-500 mt-10 outline-none focus-within:bg-green-500 focus-within:text-black bg-gray-700 lg:px-28 px-16 text-lg hover:bg-green-500 hover:text-black  font-bold py-3 rounded-2xl'>Access account <FontAwesomeIcon className='ml-2' icon={faArrowRightLong} /></button>
            <p className='text-sm text-gray-500 mt-2 ml-1 '>Don't have an account? <Link to={'/register'} className='text-green-500 hover:text-green-800 font-bold '>Create an account</Link></p>
          </form>
        </div>
      </div>
    </div>

  );
}

export default LoginPage;
