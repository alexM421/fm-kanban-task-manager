import React from "react";
import styles from "./TextInput.module.css"

export default function TextInput ({ name, placeholder, text, setText }) {


    return(
        <div className={styles.container}>
            {name? <p className="b-m">{name}</p>:""}
            <div className={styles["input-container"]}>
                <input
                className={`b-l ${!text? styles.err:""}`}
                type="text"
                placeholder={placeholder}
                value={text}
                onChange={setText}
                />
                {!text? <p className={`${styles["err-txt"]} b-l`}>Can't be empty</p>:""}
            </div>
        </div>
    )
}