import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { createScoketConnection } from '../utils/socket';
import { useSelector } from "react-redux";
import axios from "axios";
import { BaseUrl } from "../utils/constants";

const Chat = () => {
    const { targetUserId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const user = useSelector((store) => store.user);
    const userId = user?._id;

    const messagesEndRef = useRef(null);


    const fetchChatMessages = async () => {
        const chat = await axios.get(BaseUrl + "/chat/" + targetUserId, {
            withCredentials: true,
        });

        console.log(chat.data.messages);

        const chatMessages = chat?.data?.messages.map((msg) => {
            const { senderId, text } = msg;
            return {
                firstName: senderId?.firstName,
                lastName: senderId?.lastName,
                text,
            };
        });
        setMessages(chatMessages);
    };
    useEffect(() => {
        fetchChatMessages();
    }, []);

    useEffect(() => {
        if (!userId) {
            return;
        }
        const socket = createScoketConnection();
        // As soon as the page loaded, the socket connection is made and joinChat event is emitted
        socket.emit("joinChat", {
            firstName: user.firstName,
            userId,
            targetUserId,
        });

        socket.on("messageReceived", ({ firstName, lastName, text }) => {
            console.log(firstName + " :  " + text);
            setMessages((messages) => [...messages, { firstName, lastName, text }]);
        });

        return () => {
            socket.disconnect();
        };
    }, [userId, targetUserId]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const sendMessage = () => {
        const socket = createScoketConnection();
        socket.emit("sendMessage", {
            firstName: user.firstName,
            lastName: user.lastName,
            userId,
            targetUserId,
            text: newMessage,
        });
        setNewMessage("");
    };

    return (
        <div className="w-[400px] mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
            <h1 className="p-5 border-b border-gray-600">Chat</h1>
            <div className="flex-1 overflow-scroll p-5">
                {messages.map((msg, index) => {
                    const isLast = index === messages.length - 1;
                    return (
                        <div
                            key={index}
                            ref={isLast ? messagesEndRef : null} // Attach ref to the last message
                            className={
                                "chat " +
                                (user.firstName === msg.firstName ? "chat-end" : "chat-start")
                            }
                        >
                            <div className="chat-header">
                                {`${msg.firstName}`}
                                {/* <time className="text-xs opacity-50"> 2 hours ago</time> */}
                            </div>
                            <div className="chat-bubble">{msg.text}</div>
                            {/* <div className="chat-footer opacity-50">Seen</div> */}
                        </div>
                    );
                })}

            </div>
            <div className="p-5 border-t border-gray-600 flex items-center gap-2">
                <input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 border border-gray-500 text-white rounded p-2"
                ></input>
                <button onClick={sendMessage} className="btn btn-secondary">
                    Send
                </button>
            </div>
        </div>
    );
};
export default Chat;