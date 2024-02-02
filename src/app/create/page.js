"use client";

import styles from "../../styles/create/Create.module.css"
import Header from "../_components/common/_header";
import SearchBox from "../_components/create/_searchbox";

import axios from "axios";
import { useState, useEffect } from "react";
import { Dropdown, DropdownButton} from 'react-bootstrap';

export default function Create() {

    const [createtitle, setCreateTitle] = useState('새로운 스토리를 만들어보세요!');
    
    const [story, setStory] = useState('');
    const [sender, setSender] = useState('');
    const [receiver, setReceiver] = useState('');
    const [situation, setSituation] = useState('');

    const [storyList, setStoryList] = useState([
        '신데렐라', '백설공주', '인어공주', '미녀와야수', '잠자는 숲속의 미녀'
    ]);

    const [senderList, setSenderList] = useState([
        '신데렐라', '왕자'
    ]);

    const [receiverList, setReceiverList] = useState([
        '신데렐라', '왕자'
    ]);

    const [situationList, setSituationList] = useState([
        '신데렐라가 어쩌구 저쩌구 길게 으아으ㅏ룸너ㅏㅇㄹ문어ㅏ루처ㅏ퀀뤄뭥', '숲속에서ㄴㅇ라ㅓ망나ㅣ우라눙어쩌구 저꺼구 엄청 우와'
    ]);

    useEffect(() => {
        console.log(story); 
    }, [story])

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.create_container}>
                <div className={styles.create_header}>
                    {createtitle}
                </div>

                <SearchBox title="동화" dataList={storyList} setData={setStory}/>
                <SearchBox title="나의 캐릭터" dataList={senderList} setData={setSender}/>
                <SearchBox title="상대 캐릭터" dataList={receiverList} setData={setReceiver}/>
                <SearchBox title="스토리 배경상황" dataList={situationList} setData={setSituation}/>
                
                <div className={styles.create_button}>채팅 생성</div>
            </div>
        </div>
    )
}