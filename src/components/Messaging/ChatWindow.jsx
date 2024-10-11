// ChatWindow.js
import React, { useEffect, useState, useRef } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { over } from 'stompjs';
import SockJS from "sockjs-client/dist/sockjs"
import "./ChatWindow.css"
import { getTokenFromCookie } from '../../api/CookieFunctions';
import { fetchProfile } from '../../api/UserService';

let stompClient = null;

const ChatWindow = () => {
    const token = getTokenFromCookie()
    const name = ""
    const [messages, setMessages] = useState([]);
    const [connected, setConnected] = useState(false);
    const [user, setUser] = useState('User_' + Math.floor(Math.random() * 1000)); // Simulating a user

    // Initialize WebSocket connection
    const connect = () => {
        const socket = new SockJS('http://localhost:8080/ws'); // Replace with your WebSocket endpoint
        stompClient = over(socket);
        stompClient.connect({}, onConnected, onError);
    };

    const onConnected = () => {
        setConnected(true);
        stompClient.subscribe('/topic/public', onMessageReceived);
    };

    const onError = (err) => {
        console.error('Error connecting to WebSocket:', err);
    };

    // Handle received messages
    const onMessageReceived = (message) => {
        const messageBody = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, messageBody]);
    };

    // Send message
    const sendMessage = (message) => {
        if (stompClient) {
            const chatMessage = {
                sender: user,
                content: message,
                type: 'CHAT',
            };
            stompClient.send('/app/chat.sendMessage', {}, JSON.stringify(chatMessage));
        }
    };

    // Connect to WebSocket when component mounts
    useEffect(() => {
        fetchProfile(token).then(response => {
            setUser(response.data.username) // Assuming the response is in JSON format
        })
        .catch(error => {
            console.error('Error fetching token:', error);
        })
        connect();
    }, []);

    return (
        <div className="chat-window">
            <h2>Chat as {user}</h2>
            <MessageList messages={messages} />
            <MessageInput onSendMessage={sendMessage} />
        </div>
    );
};

export default ChatWindow;
