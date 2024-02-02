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

    const sendChat = () => {
        setChats(currentChats => [...currentChats, { key: Date.now(), name: user, content }]);
        setContent('');
        
    }

    const makeStoryBoard = () => {
        window.location.href =  `/chat/${pathname.split("/")[2]}/storyboard`
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