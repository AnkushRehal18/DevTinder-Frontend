import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { createScoketConnection } from '../utils/socket';
import axios from 'axios';
import { BaseUrl } from '../utils/constants';

const Chat = () => {
    const { targetUserId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("")
    const user = useSelector(store => store.user);
    const userId = user?._id;

    const socketRef = useRef(null);
    const messagesEndRef = useRef(null);


    const fetchChatMessages = async () => {
        const chat = await axios.get(BaseUrl + "/chat/" + targetUserId, { withCredentials: true })

        console.log(chat.data.messages);

        const ChatMessages = chat?.data?.messages.map((msg) => {
            return {
                senderId: msg?.senderId?._id,
                firstName: msg?.senderId?.firstName,
                // lastName: msg?.senderId?.lastName,
                text: msg?.text
            };
        });
        setMessages(ChatMessages);
    };

    useEffect(() => {
        fetchChatMessages();
    }, []);

    useEffect(() => {
        if (!userId) {
            return
        };
        const socket = createScoketConnection();
        socketRef.current = socket;
        //this event will go the joinChat event in the backend
        socket.emit("joinChat", { userId, targetUserId })

        socket.on("messageReceived", ({ firstName, text, senderId }) => {
            console.log(firstName + " " + text)
            setMessages((messages) => [...messages, { firstName, text, senderId }])
        })

        return () => {
            socket.disconnect();
        }
    }, [userId, targetUserId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);


    const sendMessage = () => {
        console.log("Sending messages")
        // const socket = createScoketConnection(); 
        socketRef.current.emit("sendMesage", {
            firstName: user.firstName,
            userId,
            targetUserId,
            text: newMessage.trim()
        })
        setNewMessage("")
    }
    return (
        <div className='w-[400px] mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col'>
            <h1 className='p-5 border-b border-grey-600'>Chat</h1>
            <div className='flex-1 overflow-scroll p-5'>
                {messages.map((msg, index) => {
                    return (
                        <div key={index} className={"chat " + (msg.senderId === userId ? "chat-end" : "chat-start")}>
                            <div className='chat-header'>
                                {`${msg.firstName}`}
                                {/* <time className='text-xs opacity-50'>2 Hours ago</time> */}
                            </div>
                            <div className='chat-bubble '>{msg.text}</div>
                            {/* <div className='chat-footer opacity-50'>Seen</div> */}
                        </div>
                    )
                })}
                <div ref={messagesEndRef} />
            </div>
            <div className='p-5 border-t border-gray-600 flex items-center gap-2 h-[60px]' >
                <input value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)} className='flex-1 border border-gray-500 text-white rounded p-2'></input>
                <button className='btn btn-primary' onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}

export default Chat
