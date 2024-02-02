"use client";

import styles from "../../../styles/chatroom/Chatroom.module.css"
import Header from "../../_components/common/_header";

import axios from "axios";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from 'next/navigation';
import { Dropdown, DropdownButton} from 'react-bootstrap';

export default function ChatRoom() {

    const pathname = usePathname();

    const [story, setStory] = useState('신데렐라');
    const [situation, setSituation] = useState('신데렐라가 어쩌구 저쩌구 길게 으아으ㅏ룸너ㅏㅇㄹ문어ㅏ루처ㅏ퀀뤄뭥');


    const sendChat = () => {  

    }

    const makeStoryBoard = () => {
        window.location.href =  `/chat/${pathname.split("/")[2]}/storyboard`
    }

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
                
                <div className={styles.chatroom_context_container}></div>

                <div className={styles.chatroom_textbox}>
                    <textarea className={styles.chatroom_textarea} />
                    <button style={{ backgroundColor: "inherit", border: "none" }} >
                        <img src="/images/send.png" alt="send" className={styles.chatroom_image_button}
                            onClick={sendChat} />
                    </button>
                </div>
            </div>
        </div>
    )
}