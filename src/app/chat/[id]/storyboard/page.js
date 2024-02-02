"use client";

import styles from "../../../../styles/storyboard/Storyboard.module.css"
import Header from "../../../_components/common/_header";

import axios from "axios";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from 'next/navigation';
import { Dropdown, DropdownButton} from 'react-bootstrap';

export default function StoryBoard() {

    const pathname = usePathname();

    const [story, setStory] = useState('신데렐라');
    const [situation, setSituation] = useState('신데렐라가 어쩌구 저쩌구 길게 으아으ㅏ룸너ㅏㅇㄹ문어ㅏ루처ㅏ퀀뤄뭥');
    const [pictureURL, setPictureURL] = useState('https://i.namu.wiki/i/qdBdyEXQiM33VnZaOYAutFApjIs7_mcW5FDyjOzaXrVIEdZMsBE8MmCcRYSkOOMsXo6Jnx09Pj4BuEL2CLW3PwPKlLBo5O5Eb1ok7_jRPPpgb0VeVgRfy1ikA3lz-bR-uN8pW2aI8QAi7Hq987lcBw.webp');

    const storePicture = () => {
        fetch(pictureURL, { method: 'GET' })
            .then((res) => {
                return res.blob();
            })
            .then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = "storyboard.png";
                document.body.appendChild(a);
                a.click();
                setTimeout((_) => {
                    window.URL.revokeObjectURL(url);
                }, 60000);
                a.remove();
                setOpen(false);
            })
            .catch((err) => {
                console.error('err: ', err);
            });
    }

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.storyboard_container}>
                <div className={styles.storyboard_header_container}>
                    <div className={styles.storyboard_header}>
                        <button style={{ backgroundColor: "inherit", border: "none" }} >
                            <img src="/images/back.png" alt="back" className={styles.storyboard_image_button}
                                onClick={() => { history.back() }} />
                        </button>
                        {story}
                        <button style={{ backgroundColor: "inherit", border: "none" }} disabled>
                            <img src="/images/bookmark.png" alt="bookmark" className={styles.storyboard_disabled_image_button}
                                style={{ backgroundColor: "inherit", border: "none", color: "white" }}/>
                        </button>
                    </div>
                    <div className={styles.storyboard_subheader}>
                        {`완성된 스토리보드를 저장하고 공유해보세요`}
                    </div>
                </div>

                <div className={styles.storyboard_context_container}>
                    <img className={styles.storyboard_picture} src={pictureURL}/>
                </div>
                
                <div className={styles.storyboard_button}>
                    <a href={pictureURL} download style={{textDecoration: "none", color: "inherit"}}>내 갤러리에 저장하기</a>
                </div>
            </div>
        </div>
    )
}