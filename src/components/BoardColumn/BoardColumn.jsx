import React from "react";
import styles from "./BoardColumn.module.css"
import TaskCard from "../TaskCard/TaskCard";


export default function BoardColumn ( { columnData, index, setColumnData, displayTask, setDisplayTask }) {

    const colors = [
        "#FF6B6B",
        "#6BCB77",
        "#4D96FF",
        "#FFD93D",
        "#845EC2",
        "#FF9671",
        "#00C9A7",
        "#B0A8B9",
        "#FFC75F",
        "#F9F871"
    ]

    const statusColor = () => {
        if(index>colors.length-1){
            return "black"
        }
        return colors[index]
    }

    const setTaskData = (newTaskData, taskIndex) => {

        const updatedTaskArr = [...columnData.tasks]
        //Updating task data
        updatedTaskArr[taskIndex] = newTaskData

        const newColumnData = {
            ...columnData,
            tasks: updatedTaskArr,            
        }


        setColumnData(newColumnData, index)
    }


    const taskCards = columnData.tasks.map((task,index) => 
        <TaskCard 
            status={columnData.name} 
            taskData={task} 
            index={index} 
            setTaskData={setTaskData} 
            key={`task-${task.title}`}
            displayTask={displayTask}
            setDisplayTask={setDisplayTask}
            />)

    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.circle} style={{backgroundColor: statusColor()}}></div>
                <h1 className="h-s">{`${columnData.name} (${columnData.tasks.length})`}</h1>
            </div>
            <div className={styles["task-cards"]}>
                {taskCards}
            </div>
        </div>
    )
}