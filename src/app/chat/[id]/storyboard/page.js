"use client";

import styles from "../../../../styles/storyboard/Storyboard.module.css"
import Header from "../../../_components/common/_header";

import axios from "axios";
import { useState, useEffect } from "react";
import { usePathname } from 'next/navigation';
import { useSearchParams } from "next/navigation";
import { Dropdown, DropdownButton} from 'react-bootstrap';
import JSZip from 'jszip';

export default function StoryBoard() {

    const pathname = usePathname();
    const chatId = pathname.split("/")[2];
    // const url = pathname.split("=")[1];

    const params = useSearchParams();
    const blobUrl = params.get('url');

    const datas = require('/public/data/situation.json');

    const [story, setStory] = useState(datas.find(data => data.id == chatId)?.story);
    const [situation, setSituation] = useState(datas.find(data => data.id == chatId)?.sit_title);

    const [imageUrls, setImageUrls] = useState([]);

    const storePicture = async () => {
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = 'images.zip'; // Specify the filename
        document.body.appendChild(a); // Append the link to the document
        a.click(); // Programmatically click the link to trigger the download
        document.body.removeChild(a); // Clean up by removing the link
        window.URL.revokeObjectURL(blobUrl); // Free up memory by revoking the blob URL
    }

    useEffect(() => {
        storePicture();
    }, []);

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
                    {/* <img className={styles.storyboard_picture} src={blobUrl} alt={`Extracted Image`} /> */}
                    {imageUrls.map((url, index) => (
                        <img key={index} className={styles.storyboard_picture} src={url} alt={`Extracted Image ${index}`} style={{ margin: '10px' }} />
                    ))}
                </div>
                
                <div className={styles.storyboard_button} onClick={storePicture}>
                    내 갤러리에 저장하기
                </div>
            </div>
        </div>
    )
}