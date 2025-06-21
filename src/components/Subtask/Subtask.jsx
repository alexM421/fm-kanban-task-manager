import React from "react";
import styles from "./Subtask.module.css"
//contexts
import { useDataContext } from "../../contexts/DataContext";
//assets
import IconCheck from "../../assets/IconCheck";
//utils
import { getSubtask, getSubtaskArr } from "../../utils/utils";
//hooks
import useSetSubtaskData from "../../hooks/useSetSubtaskData/useSetSubtaskData";

export default function Subtask ({ subtaskId }) {


    const { data } = useDataContext()
    

    const subtaskData = getSubtask(data.boards, subtaskId)

    const { title, isCompleted } = subtaskData

    const setSubtaskData = useSetSubtaskData()

    const handleChange = () => {
        const toUpdateSubtaskArr = getSubtaskArr(data.boards, subtaskData.id)
        const updatedSubtaskArr = toUpdateSubtaskArr.map(subtask => subtask.id===subtaskData.id? {...subtask, isCompleted: !subtask.isCompleted}:subtask)
  
        setSubtaskData(updatedSubtaskArr,subtaskData.id)
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