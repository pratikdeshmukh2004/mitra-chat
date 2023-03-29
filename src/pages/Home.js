import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { redirect, useNavigate } from 'react-router-dom';
import authService from '../services/authService'
import Sidebar from '../components/Chat/Sidebar';
import Messages from '../components/Chat/Messages';

var socket;

const HomePage = () => {
    const navigate = useNavigate()
    const [messages, setMessages] = useState([])
    const [user_id, setUserId] = useState("")

    const connectSocket = async () => {
        const user = await authService.getCurrentUser();
        if (!user) {
            navigate("/login")
        }
        console.log('loading...');
        socket = io(process.env.REACT_APP_SOCKET_URL);
        setUserId(socket.id)
        socket.emit('join_room', { room1: "room1", room2: "room2" })
        socket.on("msgs", (data) => {
            var mn = messages
            mn.push(data)
            setMessages([...mn])


        })
    }

    useEffect(() => {
        connectSocket()
    }, [])

    useEffect(() => {
        setUserId(socket?.id)
        console.log(socket?.id, 'socketid');
    }, [socket?.id])


    const onEnter = (e) => {
        if (e.keyCode != 13) {
            return;
        }
        console.log(e.target.id);
        socket.emit('msg', { user: { name: socket.id, id: user_id }, text: e.target.value, room: 'room1' })
        e.target.value = "";
    }

    return (
        <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: `url('/images/login_cover.jpg')` }}>
            <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-bl lg:bg-gradient-to-bt from-transparent via-gray-900 to-gray-900" style={{ backdropFilter: 'blur(0px)' }}>
                <div className='w-full flex lg:w-[80%] mx-auto lg:mt-[2%] mt-0 lg:h-[90%] h-full bg-gray-800'>
                    <Sidebar />
                    <Messages messages={messages} handleMessage={onEnter} user_id={user_id} />
                </div>
            </div>
        </div>
    );
}
export default HomePage;