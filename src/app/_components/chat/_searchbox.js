"use client";

import styles from "../../../styles/chat/_searchbox.module.css";
import { useState } from "react";

export default function SearchBox({title, dataList, setData}) {

    return (
        <div className={styles.sub_container}>
        <div className={styles.sub_title}>{title}</div>
        <select className={styles.sub_input} onChange={(e) => setData(e.target.value)}>                    
            {dataList.map((data, index) => {
                return <option key={index} value={data}>{data}</option>
            })}
        </select> 
        </div>
    )
}
