import React, { useContext } from 'react';
import { faArrowLeftLong, faArrowRightLong, faEllipsisVertical, faMagnifyingGlass, faThumbTack, faThumbtack, faWifi } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserContext as userContext } from '../../contexs/authContext';

function Sidebar({ rooms, setActiveRoom, activeRoom }) {
  const { user, setUser } = useContext(userContext)
  return (
    <div className={(activeRoom?"lg:flex hidden":"flex")+" flex-col h-full w-[30%] bg-gray-900 border-r border-gray-700"} style={{ backgroundImage: `url('/images/background_1.jpg')` }}>
      <div className=" h-full w-full bg-opacity-40 bg-gray-900" style={{ backdropFilter: 'blur(5px)' }}>

        <div className="flex items-center py-3 border-b border-gray-700 bg-gray-900 bg-opacity-80 px-5 text-white text-xl font-semibold">
          <img src='https://www.kindpng.com/picc/m/22-223910_circle-user-png-icon-transparent-png.png' className='w-8 rounded-full h-8' />
          <div className='ml-3'>
            <h3 className='font-bold text-sm text-gray-300'>{user.name}</h3>
            <p className='text-xs font-mono font-thin text-gray-300'>{user.email}</p>
          </div>
          <FontAwesomeIcon
            // onClick={setUser(true)} 
            className='ml-auto font-thin text-lg text-gray-200 cursor-pointer' icon={faEllipsisVertical} />
        </div>
        <div className='py-2 flex mx-2'>
          <input className='w-[95%] capitalize outline-none px-2 text-white text-xs font-semibold bg-gray-700 rounded-l-lg' />
          <button className='bg-gray-700 text-gray-200 px-3 rounded-r-lg'>
            <FontAwesomeIcon className='text-xs' icon={faMagnifyingGlass} />
          </button>
        </div>
        <ul className="flex flex-col overflow-y-scroll">
          {rooms.map((room) => {
            return (
              <li onClick={() => setActiveRoom(room)} className="flex cursor-pointer items-center py-3 border-b border-gray-700 bg-gray-900 bg-opacity-70 hover:bg-opacity-80 px-5 text-white text-xl font-semibold">
                <img src='https://www.kindpng.com/picc/m/22-223910_circle-user-png-icon-transparent-png.png' className='w-8 ring-1 ring-gray-600 hover:scale-110 rounded-full h-8' />
                <div className='ml-3'>
                  <h3 className='font-bold text-sm text-gray-300'>{room.name}</h3>
                  <p className='text-xs font-mono font-thin text-gray-400'>{room.lastMessage}</p>
                </div>
                <div className='ml-auto flex flex-col justify-end items-end'>
                  <p className='text-gray-600 text-[10px]'>{room.lastMessageTime}</p>
                  {room.pinned < 5 ?
                    <FontAwesomeIcon className='ml-0 text-[10px] hover:scale-150 font-thin rotate-45' icon={faThumbTack} />
                    : <></>}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
export default Sidebar;  