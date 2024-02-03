"use client";

import styles from "../../../styles/chatroom/Chatroom.module.css"
import Header from "../../_components/common/_header";
import Leftchat from "../../_components/chatroom/_leftchat";
import Rightchat from "../../_components/chatroom/_rightchat";

import axios from "axios";
import { useState, useEffect, use } from "react";
import { usePathname, useRouter } from 'next/navigation';
import { createRoot } from 'react-dom/client';

export default function ChatRoom() {

    const pathname = usePathname();

    const chatId = pathname.split("/")[2];

    const datas = require('/public/data/situation.json');

    const [story, setStory] = useState(datas.find(data => data.id == chatId)?.story);
    const [situation, setSituation] = useState(datas.find(data => data.id == chatId)?.sit_title);
    const [bot, setBot] = useState(datas.find(data => data.id == chatId)?.bot);
    const [user, setUser] = useState(datas.find(data => data.id == chatId)?.user);
    const [firstChat, setFirstChat] = useState(datas.find(data => data.id == chatId)?.sit_line);
    const [content, setContent] = useState('');

    // const [chats, setChats] = useState([{ name: bot, content: firstChat }, { name: user, content: content }]);
    const [chats, setChats] = useState([{ name: bot, content: firstChat }]);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendChat();
        } 
    };

    const sendChat = async () => {
        setChats(currentChats => [...currentChats, { key: Date.now(), name: user, content }]);
        
        const res = await axios.post(`http://3.39.81.135/api/chat/${chatId}`, {
            "chat": content
        });
        // 답장
        setChats(currentChats => [...currentChats, { key: Date.now(), name: bot, content: res.data.data }]);

        setContent('');
    }

    const makeStoryBoard = async () => {
        const res = await axios.post(`http://3.39.81.135/api/chat/summary/${chatId}`, {
            "chatList": chats
        });

        const data = res.data.data

        const endpoint = 'http://3.37.233.51:5001/genimage';

        const response  = await fetch(endpoint, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
        console.log(response)
        window.location.href =  `/chat/${pathname.split("/")[2]}/storyboard?url=${response.urls}`
        
        // .then(response => {
        //     if (!response.ok) {
        //         throw new Error('Network response was not ok');
        //     }
        //     return response.blob();
        // })
        // .then(blob => {
        //     // Create a URL for the blob object
        //     const url = window.URL.createObjectURL(blob);
        //     window.location.href =  `/chat/${pathname.split("/")[2]}/storyboard?url=${url}`
        //     // const a = document.createElement('a');
        //     // a.href = url;
        //     // a.download = 'images.zip'; // Specify the filename
        //     // document.body.appendChild(a); // Append the link to the document
        //     // a.click(); // Programmatically click the link to trigger the download
        //     // document.body.removeChild(a); // Clean up by removing the link
        //     // window.URL.revokeObjectURL(url); // Free up memory by revoking the blob URL
        // })
        // .catch(error => console.error('Error:', error));
    }

    useEffect(() => {
    }, []);

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.chatroom_container}>
                <div className={styles.chatroom_header_container}>
                    <div className={styles.chatroom_header}>
                        <button style={{ backgroundColor: "inherit", border: "none" }} >
                            <img src="/images/back.png" alt="back" className={styles.chatroom_image_button}
                                onClick={() => { history.back() }} />
                        </button>
                        {story}
                        <button style={{ backgroundColor: "inherit", border: "none" }} >
                            <img src="/images/bookmark.png" alt="bookmark" className={styles.chatroom_image_button}
                                onClick={makeStoryBoard} />
                        </button>
                    </div>
                    <div className={styles.chatroom_subheader}>
                        {situation}
                    </div>
                </div>
                
                <div id="chatting" className={styles.chatroom_context_container}>
                    {chats.map((chat, index) => (
                        chat.name === user ?
                        <Rightchat key={index} name={chat.name} content={chat.content} /> :
                        <Leftchat key={index} name={chat.name} content={chat.content} />
                    ))}
                </div>

                <div className={styles.chatroom_textbox}>
                    <textarea id="chattext" className={styles.chatroom_textarea} placeholder="메세지를 입력하세요" value={content}
                    onChange={(e) => {setContent(e.target.value)}}
                    onKeyPress={handleKeyPress}/>
                    <button style={{ backgroundColor: "inherit", border: "none" }} >
                        <img src="/images/send.png" alt="send" className={styles.chatroom_image_button}
                            onClick={sendChat} />
                    </button>
                </div>
            </div>
        </div>
    )
}