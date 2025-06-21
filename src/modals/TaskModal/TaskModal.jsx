import React from "react";
import styles from "./TaskModal.module.css"
//features
import PopUpBackground from "../../features/Modals/PopUpBackground/PopUpBackground";
//components
import EditBtn from "../../components/EditBtn/EditBtn";
import Subtask from "../../components/Subtask/Subtask";
//shared
import CustomSelect from "../../shared/CustomSelect/CustomSelect";
//hooks
import useDisplayHandler from "../../hooks/useDisplayHandler/useDisplayHandler";
//utils
import { getStatus, getTask, getTaskArr } from "../../utils/utils";
//contexts
import { useDataContext } from "../../contexts/DataContext";
import useSetSelectedStatus from "../../hooks/useSetSelectedStatus/useSetSelectedStatus";


export default function TaskModal ({ taskId, setModalDisplay, boardData }) {

    const { data } = useDataContext()
    const taskData = getTask(data.boards, taskId)
    
    //handle the display
    const containerRef = React.useRef(undefined)
    const displayHandler = useDisplayHandler()
    displayHandler(containerRef, setModalDisplay)
    
    const doneSubtasksCount = taskData.subtasks.reduce((acc, subtask) => subtask.isCompleted? acc+1:acc,0)
    
    
    const statusNames = boardData.columns.map(col => col.name)
    
    const status = getStatus(data.boards, taskId)

    const setSelectedStatus = useSetSelectedStatus()

    const setSelectedOption = (newStatus) => {
        setSelectedStatus(taskId,status,newStatus)
    }

    return(
        <>
            <div className={styles.container} ref={containerRef}>
                <div className={styles.header}>
                    <h1 className="h-l">{taskData.title}</h1>
                    <EditBtn variant="task" localData={taskData}/>
                </div>
                {taskData.description && <p className="b-l">{taskData.description}</p>}
                <div className={styles.subtasks}>
                    <h2 className="b-m">{`Subtasks (${doneSubtasksCount} of ${taskData.subtasks.length})`}</h2>
                    <div className={styles["subtasks-list"]}>
                        {taskData.subtasks.map((subtask) => <Subtask subtaskId={subtask.id} key={subtask.id}/>)}
                    </div>
                </div>
                <div className={styles["current-status"]}>
                    <p className="b-m">Current Status</p>
                    <CustomSelect optionsArr={statusNames} selectedOption={status} setSelectedOption={setSelectedOption}/>
                </div>
            </div>
            <PopUpBackground/>
        </>
    )
}