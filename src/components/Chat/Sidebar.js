import React from 'react';
import { faArrowLeftLong, faArrowRightLong, faEllipsisVertical, faMagnifyingGlass, faThumbTack, faThumbtack, faWifi } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Sidebar() {
  return (
    <div className="flex flex-col h-full w-[30%] bg-gray-900 border-r border-gray-700">
      <div className="flex items-center py-3 border-b border-gray-700 bg-gray-800 px-5 text-white text-xl font-semibold">
        <img src='https://i.pravatar.cc/300' className='w-8 rounded-full h-8' />
        <div className='ml-3'>
          <h3 className='font-bold text-sm text-gray-300'>Pratik Deshmukh</h3>
          <p className='text-xs font-mono font-thin text-gray-300'>pratikdeshmukhlobhi@gmail.com</p>
        </div>
        <FontAwesomeIcon className='ml-auto font-thin text-lg text-gray-200 cursor-pointer' icon={faEllipsisVertical} />
      </div>
      <div className='py-2 flex mx-2'>
        <input className='w-[95%] outline-none px-2 bg-gray-700 rounded-l-lg' />
        <button className='bg-gray-700 text-gray-200 px-3 rounded-r-lg'>
          <FontAwesomeIcon className='text-xs' icon={faMagnifyingGlass} />
        </button>
      </div>
      <ul className="flex flex-col overflow-y-scroll">
        {[...Array(1000).keys()].map((room) => {
          return (
            <li className="flex cursor-pointer items-center py-3 border-b border-gray-700 hover:bg-gray-800 px-5 text-white text-xl font-semibold">
              <img src='https://i.pravatar.cc/300' className='w-8 rounded-full h-8' />
              <div className='ml-3'>
                <h3 className='font-bold text-sm text-gray-300'>Navgurukul Dharamshala 2k20</h3>
                <p className='text-xs font-mono font-thin text-gray-400'>How was the last food?</p>
              </div>
              <div className='ml-auto flex flex-col justify-end items-end'>
                <p className='text-gray-600 text-[10px]'>02:30 PM</p>
                {room < 5 ?
                  <FontAwesomeIcon className='ml-0 text-[10px] font-thin rotate-45' icon={faThumbTack} />
                  : <></>}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
export default Sidebar;  