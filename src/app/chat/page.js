"use client";

import styles from "../../styles/chat/Chat.module.css"
import Header from "../_components/common/_header";
import SearchBox from "../_components/chat/_searchbox";

import axios from "axios";
import { useState, useEffect, React } from "react";
import { Dropdown, DropdownButton} from 'react-bootstrap';

export default function Chat() {
    const datas = require('/public/data/situation.json');

    const [createtitle, setCreateTitle] = useState('새로운 스토리를 만들어보세요!');

    const [story, setStory] = useState('');
    const [sender, setSender] = useState('');
    const [receiver, setReceiver] = useState('');
    const [situation, setSituation] = useState('');

    const [chatId, setChatId] = useState(1); // /chat/{chatId}로 이동

    const [storyList, setStoryList] = useState([
        "", ...new Set(datas.map((data) => data.story))
    ]);

    const [senderList, setSenderList] = useState([]);
    const [receiverList, setReceiverList] = useState([]);
    const [situationList, setSituationList] = useState([]);

    const chatroom = () => {
        window.location.href = `/chat/${chatId}`
    }

    useEffect(() => {
        setSenderList([
            "", ...new Set(datas.filter(data => data.story == story).map(data => data.user))
        ]);
        setReceiverList([
            "", ...new Set(datas.filter(data => data.story == story && data.user == sender).map(data => data.bot))
        ]);
        setSituationList([
            "", ...new Set(datas.filter(data => data.story == story && data.user == sender && data.bot == receiver).map(data => data.sit_title))
        ]);
        setChatId(
            ...new Set(datas.filter(data => data.story == story && data.user == sender && data.bot == receiver).map(data => data.id))
        )
    }, [story, sender, receiver, situation])

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.create_container}>
                <div className={styles.create_header}>
                    {createtitle}
                </div>

                <div className={styles.create_select_container}>
                    <SearchBox title="동화" dataList={storyList} setData={setStory}/>
                    <SearchBox title="나의 캐릭터" dataList={senderList} setData={setSender}/>
                    <SearchBox title="상대 캐릭터" dataList={receiverList} setData={setReceiver}/>
                    <SearchBox title="스토리 배경상황" dataList={situationList} setData={setSituation}/>
                </div>
                    
                <div className={styles.create_button} onClick={chatroom}>채팅 생성</div>
            </div>
        </div>
    )
}