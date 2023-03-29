import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { redirect, useNavigate } from 'react-router-dom';
import authService from '../services/authService'

const HomePage = () => {
    const navigate = useNavigate()
    const [loaded, setloaded] = useState(false)
    useEffect(() => {
        setTimeout(async() => {
          const user = await authService.getCurrentUser();
          console.log(user, 'user...');
          setloaded(true)
          if (!user) {
            navigate("/login")
          }
        }, 0);
      }, [])
    const [messages, setMessages] = useState([{ user: "Admin", "message": "Welcome to Room" }])
    const socket = io('http://localhost:5050');
    const searchParams = new URLSearchParams(window.location.search);
    const room1 = searchParams.get('room1');
    const room2 = searchParams.get('room2');
    socket.emit('join_room', {room1, room2})
    socket.on("msgs", (data)=>{
        console.log(data, 'data...');
        setMessages([...messages, data])
    })

    useEffect(() => {
        console.log('====================================');
        console.log('connection changed...', socket.id);
        console.log('====================================');
        
    }, [socket.connected])

    const onEnter = (e)=>{
        if (e.keyCode != 13){
            return ;
        }
        console.log(e.target.id);
        socket.emit('msg', {user: socket.id, message: e.target.value, room: e.target.id})
        e.target.value = "";
    }
    if (!loaded) return;
    return (
        <div className='flex justify-between px-20 gap-2 mt-20 '>
            <div className='px-20 py-10 border-2 border-green-400'>
                <h2 className='text-lg text-center font-bold'>{room1}</h2>
                <ul>
                    {messages.filter((item)=>item.room == room1).map((item) => {
                        return (
                            <li>{item.user}: {item.message}</li>
                        )
                    })}
                    <input onKeyDown={onEnter} id={room1} className='outline-none mt-20 border-b border-green-300' placeholder='Type message...' />
                </ul>
            </div>
            <div className='px-20 py-10 border-2 border-green-400'>
                <h2 className='text-lg text-center font-bold'>{room2}</h2>
                <ul>
                    {messages.filter((item)=>item.room == room2).map((item) => {
                        return (
                            <li>{item.user}: {item.message}</li>
                        )
                    })}
                    <input onKeyDown={onEnter} id={room2} className='outline-none mt-20 border-b border-green-300' placeholder='Type message...' />
                </ul>
            </div>
        </div>
    );
}
export default HomePage;