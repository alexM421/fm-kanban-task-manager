import React from "react";
import styles from "./BoardColumn.module.css"
//components
import TaskCard from "../TaskCard/TaskCard";

export default function BoardColumn ( { columnData, statusColor }) {

    const taskCards = columnData.tasks.map((task,index) => 
        <TaskCard 
            taskData={task} 
            key={`task-${task.id}`}
            />)

    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.circle} style={{backgroundColor: statusColor}}></div>
                <h1 className="h-s">{`${columnData.name} (${columnData.tasks.length})`}</h1>
            </div>
            <div className={styles["task-cards"]}>
                {taskCards}
            </div>
        </div>
    )
}