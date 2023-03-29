import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faArrowRightLong, faEnvelope, faEye, faEyeSlash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Typing from "react-typing-effect";
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

function RegisterPage() {

  const navigate = useNavigate()
  const [passType, setPassType] = useState("password")
  const [errors, setErrors] = useState({})
  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const [isloading, setisLoading] = useState(false)


  useEffect(() => {
    setTimeout(async () => {
      const user = await authService.getCurrentUser();
      if (user) {
        navigate("/home")
      }
    }, 0);
  }, [])


  const updateInputField = (ref, error) => {
    if (error) {
      ref.current?.classList.add('ring-rose-500')
      ref.current?.classList.add('ring-1')

      ref.current?.classList.remove('ring-green-500')
      ref.current?.classList.remove('focus-within:ring-1')

    } else {
      ref.current?.classList.remove('ring-rose-500')
      ref.current?.classList.remove('ring-1')

      ref.current?.classList.add('ring-green-500')
      ref.current?.classList.add('focus-within:ring-1')
    }
  }

  useEffect(() => {
    updateInputField(nameRef, errors.name)
    updateInputField(emailRef, errors.email)
    updateInputField(passwordRef, errors.password)
  }, [errors])

  const errorHandler = (e) => {
    if (e.target.id == "email") {
      const email = e.target.value;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setErrors({ email: "Invalid Email Address." })
      } else {
        setErrors({ email: "" })
      }
    } else {
      setErrors({})
    }
  }
  const onSignup = async (e) => {
    e.preventDefault()

    const first_name = e.target[0].value;
    const last_name = e.target[1].value;
    const email = e.target[2].value;
    const password = e.target[3].value;
    if (!first_name || !email || !password) {
      setErrors({ name: !first_name ? "Can't be blank." : "", email: !email ? "Can't be blank." : "", password: !password ? "Can't be blank." : "" })
      return;
    }
    setisLoading(true)
    const result = await authService.register(`${first_name} ${last_name}`, email, password)
    setisLoading(false)
    if (!result.status) {
      if (result.message.includes("exists")) {
        setErrors({ ...errors, email: result.message })
      } else {
        setErrors({ email: result.message, password: result.message })
      }
    } else {
      navigate("/login")
    }
  }

  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: `url('/images/login_cover.jpg')` }}>
      <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-bl lg:bg-gradient-to-l from-transparent via-gray-900 to-gray-900" style={{ backdropFilter: 'blur(5px)' }}>
        <div class="h-16 mt-10 lg:mt-20 lg:ml-20 ml-0">
          <a className='flex flex-row ml-8'>
            <span className='w-8 h-8 rounded-full bg-green-500'></span>
            <span class="text-green-500 font-bold text-lg ml-3">Mitra Chat</span>
          </a>
          <form autoComplete='off' onChange={errorHandler} onSubmit={onSignup} aria-autocomplete='off' className='ml-10'>
            <p class="text-gray-400 font-bold text-xs mt-20 uppercase">Start for free</p>
            <h2 className='text-white font-bold text-3xl mt-2'>
              <Typing typingDelay={50} speed={100} hideCursor={false} cursorClassName={"text-green-500"} eraseSpeed={200} text={"Create new account."} /></h2>
            <div className='flex gap-0 lg:gap-5 flex-col lg:flex-row'>
              <div>
                <div ref={nameRef} class="bg-gray-800 focus-within:ring-1 ring-green-400 rounded-xl px-6 pt-1 pb-2 mt-10 lg:w-44 w-72">
                  <label class="mr-4 text-gray-400 text-xs" for="username">First Name</label>
                  <span class="flex">
                    <input id='name' class="bg-gray-800 rounded-lg w-full outline-none font-bold text-sm text-white capitalize" type="text" />
                    <FontAwesomeIcon className='ml-2 text-lg -mt-2 text-gray-400' icon={faAddressCard} />
                  </span>
                </div>

              </div>
              <div class="bg-gray-800 focus-within:ring-1 ring-green-400  rounded-xl px-6 pt-1 pb-2 mt-5 lg:mt-10 lg:w-48 w-72">
                <label class="mr-4 text-gray-400 text-xs " for="username">Last Name</label>
                <span class="flex">
                  <input class="bg-gray-800 rounded-lg w-full outline-none font-bold text-sm text-white capitalize" type="text" />
                  <FontAwesomeIcon className='ml-2 text-lg -mt-2 text-gray-400' icon={faAddressCard} />
                </span>
              </div>
              {/* <p className='text-rose-500 font-bold text-xs px-2 rounded-b-lg  w-64 lg:w-80 mt-1'>{errors.first_name} </p> */}
            </div>
            <div ref={emailRef} class="bg-gray-800 focus-within:ring-1   ring-green-400  rounded-xl px-6 pb-2 pt-1 mt-5 w-72 lg:w-96">
              <label class="mr-4 text-gray-400 text-xs " for="username">Email</label>
              <span class="flex">
                <input id='email' class="bg-gray-800 rounded-lg w-full outline-none font-bold text-sm text-white lowercase" type="text" />
                <FontAwesomeIcon className='ml-2 text-lg -mt-2 text-gray-400' icon={faEnvelope} />
              </span>
            </div>
            <p className='text-rose-500 font-bold text-xs px-2 rounded-b-lg  w-64 lg:w-80 mt-1'>{errors.email} </p>
            <div ref={passwordRef} class="bg-gray-800 focus-within:ring-1   ring-green-400  rounded-xl px-6 pb-2 pt-1 mt-5 w-72 lg:w-96">
              <label class="mr-4 text-gray-400 text-xs " for="username">Password</label>
              <span class="flex">
                <input id='password' type={passType} class="bg-gray-800 rounded-lg w-full outline-none font-bold text-sm text-white" />
                <FontAwesomeIcon onClick={() => setPassType(passType == "password" ? "text" : "password")} className='ml-2 text-lg -mt-2 text-green-400 cursor-pointer' icon={passType == "text" ? faEyeSlash : faEye} />
              </span>
            </div>
            <p className='text-rose-500 font-bold text-xs px-2 rounded-b-lg  w-64 lg:w-80 mt-1'>{errors.password} </p>
            <div className='mt-10 gap-4'>
              <button disabled={isloading} type='submit' className='text-green-500 outline-none focus-within:bg-green-500 focus-within:text-black bg-gray-700 lg:px-28 px-16 text-lg hover:bg-green-500 hover:text-black  font-bold py-3 rounded-2xl'>Create account
                {!isloading ? <FontAwesomeIcon className='ml-2' icon={faArrowRightLong} /> :
                  <FontAwesomeIcon className='ml-2 animate-spin' icon={faSpinner} />}

              </button>
              <p className='text-sm text-gray-500 mt-2 ml-1'>Already have an account? <Link to={'/login'} className='text-green-500 hover:text-green-800 font-bold '>Access your account</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
}

export default RegisterPage;
