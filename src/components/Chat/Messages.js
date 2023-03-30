import React, { useContext, useEffect, useRef, useState } from 'react';
import { faArrowLeftLong, faArrowRightLong, faClose, faEllipsisVertical, faFaceGrinHearts, faFaceSmile, faMagnifyingGlass, faMicrophone, faPaperclip, faThumbTack, faThumbtack, faWifi } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SocketContext } from '../../contexs/socketContext';
import { UserContext } from '../../contexs/authContext';

function Messages({ setActiveRoom,activeRoom, messages = [], user_id }) {

  const {user, setUser} = useContext(UserContext)
    
    const messagesRef = useRef(null)

    const socket = useContext(SocketContext)


    const handleMessage = (e) => {
        if (e.keyCode != 13) {
            return;
        }
        console.log(e.target.id);
        socket.emit('msg', { user: { name: user.name, id: socket.id }, text: e.target.value, room: activeRoom.id })
        e.target.value = "";
    }   

    useEffect(() => {
        if (messagesRef.current){
            messagesRef.current.scrollIntoView({ behavior: 'smooth' });
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    }, [messages])

    if (!activeRoom) return (
        <div className="lg:flex hidden flex-col items-center h-full w-[70%] bg-gray-900 border-r border-gray-700">
            <div className='flex my-auto'>
                <img className='w-16' src='/logo.png' />
                <h2 className='font-mono font-bold text-3xl text-gray-200 ml-5 mt-3'>Mitra Chat</h2>
            </div>
            <img src='/images/girl_chatting.png' />
            <span className='h-20 mt-auto text-gray-200 text-center text-[10px] font-mono bg-transparent'>
                <b><FontAwesomeIcon icon={faArrowLeftLong} /> <span className='text-gray-400 text-[10px]'>Designed and Managed By </span><FontAwesomeIcon icon={faArrowRightLong} /><br /> Pratik Deshmukh & Bhupendra Deshmukh</b>
            </span>
        </div>

    )
    return (

        <div className="flex flex-col h-full w-full lg:w-[70%] bg-gray-900 border-r border-gray-700">
            <div className="flex items-center py-3 border-b border-gray-700 bg-gray-800 px-5 text-white text-xl font-semibold">
                <img src='https://www.kindpng.com/picc/m/22-223910_circle-user-png-icon-transparent-png.png' className='w-8 rounded-full h-8' />
                <div className='ml-3'>
                    <h3 className='font-bold text-sm text-gray-300'>{activeRoom.name}</h3>
                    <p className='text-xs font-mono font-thin text-gray-400'>{activeRoom.members || 1} Members</p>
                </div>
                <FontAwesomeIcon onClick={()=>setActiveRoom(null)} className='ml-auto font-thin text-xl text-gray-200 cursor-pointer' icon={faClose} />
            </div>
            <div ref={messagesRef} className='px-5 py-5 h-full overflow-y-scroll'>
                {messages.filter((message)=>message.room == activeRoom.id)?.map((message) => {
                    return (
                        <div className={'flex py-2' + (message.user.id == socket.id ? ' justify-start flex-row-reverse' : "")}>
                            <img src='https://www.kindpng.com/picc/m/22-223910_circle-user-png-icon-transparent-png.png' className='w-8 rounded-full h-8' />
                            <div className={'mx-2 max-w-[400px] bg-gray-800 px-3 py-1 rounded-lg' + (message.user.id == user_id ? ' rounded-tr-none' : " rounded-tl-none")}>
                                <div className='flex justify-between'>
                                    <p className='text-green-500 text-xs font-bold'>{message.user.name}</p>

                                </div>
                                <p className='text-gray-200 text-sm'>{message.text}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className='bg-gray-800 flex py-2 items-center mt-auto'>
                <FontAwesomeIcon className='text-gray-200 cursor-pointer hover:scale-150 text-xl mx-5' icon={faFaceSmile} />
                <input autoFocus onKeyDown={handleMessage} placeholder='Type a message' className='w-[82%] font-mono h-8 outline-none px-3 bg-gray-700 rounded-lg text-white py-2' />
                <FontAwesomeIcon className='text-gray-200 cursor-pointer hover:scale-150 text-xl mx-3' icon={faPaperclip} />
                <FontAwesomeIcon className='text-gray-200 cursor-pointer hover:scale-150 text-xl mx-3' icon={faMicrophone} />
            </div>
        </div>
    )
}
export default Messages;  