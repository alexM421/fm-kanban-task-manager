import React from "react";
import styles from "./TextAreaInput.module.css"

export default function TextAreaInput ({ name, placeholder, text, setText }) {


    return(
        <div className={styles.container}>
            {name? <p className="b-m">{name}</p>:""}
            <div className={styles["input-container"]}>
                <textarea
                className={`b-l `}
                type="text"
                placeholder={placeholder}
                value={text}
                onChange={setText}
                />
            </div>
        </div>
    )
}