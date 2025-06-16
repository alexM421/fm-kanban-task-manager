import React from "react";
import styles from "./Task.module.css"

import PopUpBackground from "../../components/PopUpBackground/PopUpBackground";
import EditBtn from "../../components/EditBtn/EditBtn";
import TextInput from "../../components/TextInput/TextInput";
import CustomSelect from "../../components/CustomSelect/CustomSelect"
import FindBoard from "../../features/findBoard";
import Subtask from "../../components/Subtask/Subtask";
import useDisplayHandler from "../../hooks/useDisplayHandler";

export default function Task ({ taskData, setTaskDisplay, setTaskData, index, doneSubtasksCount, status}) {

    const boardData = FindBoard().board
    const columnsNames = boardData.columns.map(col => col.name)

    //handle the display
    const containerRef = React.useRef(undefined)
    const displayHandler = useDisplayHandler()
    displayHandler(containerRef, setTaskDisplay)
    
    //currentStatus


    //Passing down the ability to setSubtasks
    const setSubtaskData = (newSubtaskData, subtaskIndex) => {

        const toUpdateSubtasksArr = [...taskData.subtasks]
        
        //Updating subtask data
        toUpdateSubtasksArr[subtaskIndex] = newSubtaskData
 
        const newTaskData = {
            ...taskData,
            subtasks: toUpdateSubtasksArr,
        }
        setTaskData(newTaskData, index)
    }

    const setSelectedStatus = (newStatus) => {
        const newTaskData = {
            ...taskData,
            status: newStatus,
        }
        setTaskData(newTaskData, index)
    }
    


    return(
        <>
            <div className={styles.container} ref={containerRef}>
                <div className={styles.header}>
                    <h1 className="h-l">{taskData.title}</h1>
                    <EditBtn/>
                </div>
                {taskData.description && <p className="b-l">{taskData.description}</p>}
                <div className={styles.subtasks}>
                    <h2 className="b-m">{`Subtasks (${doneSubtasksCount} of ${taskData.subtasks.length})`}</h2>
                    <div className={styles["subtasks-list"]}>
                        {taskData.subtasks.map((subtask,index) => <Subtask subtaskData={subtask} setSubtaskData={setSubtaskData} index={index} key={`subtask-${crypto.randomUUID()}`}/>)}
                    </div>
                </div>
                <div className={styles["current-status"]}>
                    <p className="b-m">Current Status</p>
                    <CustomSelect optionsArr={columnsNames} selectedOption={status} setSelectedOption={setSelectedStatus}/>
                </div>
            </div>
            <PopUpBackground/>
        </>
    )
}