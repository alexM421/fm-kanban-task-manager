import React from "react";
import styles from "./Subtask.module.css"
import IconCheck from "../../assets/IconCheck";

export default function Subtask ({ subtaskData, setSubtaskData, index }) {

    const { title, isCompleted } = subtaskData

    const handleChange = () => {


        const newSubtaskData = {
            ...subtaskData,
            isCompleted: !subtaskData.isCompleted
        }
        setSubtaskData(newSubtaskData, index)
    }

    return(
        <div className={styles.container}>
            <label className={styles["custom-checkbox"]}>
                <IconCheck/>
                <input type="checkbox" checked={isCompleted} onChange={handleChange}/>
            </label>
            <p className="b-m">{title}</p>
        </div>
    )
}