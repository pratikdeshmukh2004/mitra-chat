import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { redirect, useNavigate } from 'react-router-dom';
import authService, { UserContext } from '../contexs/authContext'
import Sidebar from '../components/Chat/Sidebar';
import Messages from '../components/Chat/Messages';
import { SocketContext } from '../contexs/socketContext';

// var socket;

const HomePage = () => {
    const navigate = useNavigate()
    const socket = useContext(SocketContext)
    const user = useContext(UserContext)
    const [messages, setMessages] = useState([])
    const [rooms, setRooms] = useState([{
        name: "Navgurukul Dharamshala",
        id:1
    },
    {
        name: "Navgurukul Banglore",
        id:2
    },
    {
        name: "Lobhi Wale",
        id:3
    },
    {
        name: "Leap Club",
        id:4
    }
    ])
    const [activeRoom, setActiveRoom] = useState(null)

    const connectSocket = async () => {
        socket.emit('join_room', { room1: rooms[0].id, room2:rooms[1].id })
        socket.on("msgs", (data) => {
            var mn = messages
            mn.push(data)
            setMessages([...mn])
        })
    }

    useEffect(() => {
        connectSocket()
    }, [socket])



    return (
        <div className="h-screen bg-cover bg-center relative" style={{ backgroundImage: `url('/images/login_cover.jpg')` }}>
            <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-bl lg:bg-gradient-to-bt from-transparent via-gray-900 to-gray-900" style={{ backdropFilter: 'blur(0px)' }}>
                <div className='w-full flex lg:w-[80%] mx-auto lg:mt-[2%] mt-0 lg:h-[90%] h-full bg-gray-800'>
                    <Sidebar setActiveRoom={setActiveRoom} activeRoom={activeRoom} rooms={rooms} messages={messages} />
                    <Messages setActiveRoom={setActiveRoom} activeRoom={activeRoom} messages={messages} />
                </div>
            </div>
        </div>
    );
}
export default HomePage;