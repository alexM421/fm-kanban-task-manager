import React from "react";
import styles from "./TaskCard.module.css"

import { Link } from "react-router-dom";

export default function TaskCard ({ taskData }) {

    const { title , subtasks } = taskData

    const doneSubtasksCount = subtasks.reduce((acc, subtask) => subtask.isCompleted? acc+1:acc,0)

    return(
        <Link className={styles.container}>
            <h1 className="h-m">{title}</h1>
            <p className="b-m">{`${doneSubtasksCount} out of ${subtasks.length} subtasks`}</p>
        </Link>
    )
}