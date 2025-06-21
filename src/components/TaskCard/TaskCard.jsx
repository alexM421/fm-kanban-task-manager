import React from "react";
import styles from "./TaskCard.module.css"
import { Link } from "react-router-dom";
//contexts
import { useModalContext } from "../../contexts/ModalContext";
//hooks
import useBoardBySlug from "../../hooks/useBoardBySlug/useBoardBySlug";
//modals
import TaskModal from "../../modals/TaskModal/TaskModal";
//utils
import { toggleState } from "../../utils/utils";

export default function TaskCard ({ taskData }) {

    const { title , subtasks } = taskData
    const [displayTask, setDisplayTask] = React.useState(false)

    const doneSubtasksCount = subtasks.reduce((acc, subtask) => subtask.isCompleted? acc+1:acc,0)

    const boardData = useBoardBySlug()

    const { openModal, closeModal } = useModalContext()
    React.useEffect(() => {
        !displayTask 
            ?closeModal()
            :openModal(<TaskModal taskId={taskData.id} setModalDisplay={setDisplayTask} boardData={boardData} key={`task-modal-${taskData.id}`}/>)
    },[displayTask])


    return(
        <>
            <Link className={styles.container} onClick={() => toggleState(setDisplayTask)}>
                <h1 className="h-m">{title}</h1>
                <p className="b-m">{`${doneSubtasksCount} out of ${subtasks.length} subtasks`}</p>
            </Link>
        </>

    )
}