import React, { useContext, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong, faEnvelope, faEye, faEyeSlash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Typing from "react-typing-effect";
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/userService'
import { reactLocalStorage } from 'reactjs-localstorage';
import { UserContext } from '../contexs/authContext';


function LoginPage(props) {

  const [passType, setPassType] = useState("password")
  const [errors, setErrors] = useState({})
  const [isloading, setisLoading] = useState(false)
  const { setUser } = useContext(UserContext)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)


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
    }
  }

  const onLogin = async (e) => {
    e.preventDefault()
    if (errors.email || errors.password) {
      return;
    }
    const email = e.target[0].value;
    const password = e.target[1].value;
    if (!email) return setErrors({ ...errors, email: "Can't be blank." })
    if (!password) return setErrors({ ...errors, password: "Can't be blank." })
    setisLoading(true)
    const result = await authService.login(email, password)
    setisLoading(false)
    if (!result.status) {
      if (result.message.includes("exists")) {
        setErrors({ ...errors, email: result.message })
      } else {
        setErrors({ email: result.message, password: result.message })
      }
    } else {
      console.log(result, 'dat....');
      setUser(result.user)
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
          <form onChange={errorHandler} onSubmit={onLogin} className='ml-10 mt-20'>
            <h2 className='text-white font-bold text-3xl mt-2'>
              <Typing typingDelay={50} speed={100} cursorClassName={"text-green-500"} text={"Welcome Back."} /></h2>
            <div ref={emailRef} className="bg-gray-800 focus-within:ring-1  ring-green-500  rounded-xl px-6 pb-2 pt-1 mt-10 w-72 lg:w-96">
              <label className="mr-4 text-gray-400 text-xs " htmlFor="username">Email</label>
              <span className="flex">
                <input id='email' className=" bg-gray-800 w-full outline-none font-bold text-sm text-white lowercase" type="text" />
                <FontAwesomeIcon className='ml-2 text-lg -mt-2 text-gray-400' icon={faEnvelope} />
              </span>
            </div>
            <p className='text-rose-500 font-bold text-xs px-2 rounded-b-lg  w-64 lg:w-80 mt-1'>{errors.email} </p>
            <div ref={passwordRef} className="bg-gray-800 focus-within:ring-1   ring-green-400  rounded-xl px-6 pb-2 pt-1 mt-5 w-72 lg:w-96">
              <label className="mr-4 text-gray-400 text-xs " htmlFor="username">Password</label>
              <span className="flex">
                <input type={passType} className="bg-gray-800 w-full outline-none font-bold text-sm text-white" />
                <FontAwesomeIcon onClick={() => setPassType(passType == "password" ? "text" : "password")} className='ml-2 text-lg -mt-2 text-green-400 cursor-pointer' icon={passType == "text" ? faEyeSlash : faEye} />
              </span>
            </div>
            <p className='text-rose-500 font-bold text-xs px-2 rounded-b-lg  w-64 lg:w-80 mt-1'>{errors.password} </p>
            <button type='submit' className='text-green-500 mt-10 outline-none focus-within:bg-green-500 focus-within:text-black bg-gray-700 lg:px-28 px-16 text-lg hover:bg-green-500 hover:text-black  font-bold py-3 rounded-2xl'>Access account
              {!isloading ? <FontAwesomeIcon className='ml-2' icon={faArrowRightLong} /> :
                <FontAwesomeIcon className='ml-2 animate-spin' icon={faSpinner} />}
            </button>
            <p className='text-sm text-gray-500 mt-2 ml-1 '>Don't have an account? <Link to={'/register'} className='text-green-500 hover:text-green-800 font-bold '>Create an account</Link></p>
          </form>
        </div>
      </div>
    </div>

  );
}

export default LoginPage;
