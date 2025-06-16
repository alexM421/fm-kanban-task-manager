import React from "react";
import styles from "./TaskCard.module.css"

import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import Task from "../../layouts/Task/Task";

export default function TaskCard ({ taskData, setTaskData, index, status }) {

    const { title , subtasks } = taskData
    const [displayTask, setDisplayTask] = React.useState(false)

 

    const doneSubtasksCount = subtasks.reduce((acc, subtask) => subtask.isCompleted? acc+1:acc,0)

    return(
        <>
            <Link className={styles.container} onClick={() => setDisplayTask(prevState => !prevState)}>
                <h1 className="h-m">{title}</h1>
                <p className="b-m">{`${doneSubtasksCount} out of ${subtasks.length} subtasks`}</p>
            </Link>
            {displayTask 
                && createPortal(
                    <Task 
                        taskData={taskData} 
                        setTaskDisplay={setDisplayTask}
                        setTaskData={setTaskData}
                        index={index}
                        doneSubtasksCount={doneSubtasksCount}
                        status={status}
                        key={taskData.title}
                        />
                        ,document.body)}
        </>

    )
}