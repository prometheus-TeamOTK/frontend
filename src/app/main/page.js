"use client";

import styles from "../../styles/main/Main.module.css"
import axios from "axios";
import { useState, useEffect } from "react";

import Header from "../_components/common/_header";

export default function Main() {

    const [maintitle, setMainTitle] = useState('\n현실 세계의 내가🙋🏻‍♀️\n\n동화✨ 속 세상에\n\n들어가게 되었다?!💥😱 ');
    const [subtitle, setSubTitle] = useState('좋아하는 등장 인물과 대화하고\n\n스토리 보드를 만들어보세요!');
    const [createButton, setCreateButton] = useState('스토리 만들기');

    const create = () => {
        window.location.href = "/chat"
    }

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.main_container}>
                <div className={styles.main_title}>
                    {maintitle}
                </div>
                <div className={styles.sub_title}>
                    {subtitle}
                </div>
                <div className={styles.create_button} onClick={create}>
                    {createButton}
                </div>
            </div>
        </div>
    )
}