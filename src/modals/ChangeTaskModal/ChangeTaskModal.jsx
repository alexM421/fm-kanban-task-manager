import React from "react";
import styles from "./ChangeTaskModal.module.css"
import { nanoid } from "nanoid";
//Contexts
import { useDataContext } from "../../contexts/DataContext";
import { useModalContext } from "../../contexts/ModalContext";
//Shared
import TextInput from "../../shared/TextInput/TextInput"
import Button from "../../shared/Button/Button";
import TextAreaInput from "../../shared/TextAreaInput/TextAreaInput";
import CustomSelect from "../../shared/CustomSelect/CustomSelect";
//features
import PopUpBackground from "../../features/modals/PopUpBackground/PopUpBackground";
import TextInputsDeletable from "../../features/Modals/TextInputsDeletable/TextInputsDeletable";
import useAddTaskSubmit from "../../features/Modals/useAddTaskSubmit/useAddTaskSubmit";
import useEditTaskSubmit from "../../features/Modals/useEditTaskSubmit/useEditTaskSubmit";
//utils
import { getBoardByTaskId, getStatus, getTaskArr } from "../../utils/utils";

export default function ChangeTaskModal ({ setDisplayModal, variant="add", taskData, boardDataProp }) {

    const { data, setData } = useDataContext()
    const { closeModal } = useModalContext()

    const addTaskSubmit = useAddTaskSubmit()
    const editTaskSubmit = useEditTaskSubmit()

    const [localData, setLocalData] = React.useState({title: "", subtasks: [], id: nanoid(), description: ""})

    React.useEffect(() => {
        if(taskData){
            setLocalData(taskData)
        }
    },[])

    //Title onchange handler
    const setTaskTitle = (e) => {
        setLocalData(prevState => ({...prevState, title: e.target.value}))
    } 

    const setTaskDescription = (e) => {
        setLocalData(prevState => ({...prevState, description: e.target.value}))
    }

    //CustomDisplayHandler
    const containerRef = React.useRef(undefined)
    React.useEffect(() => {
        const handleClickOutside = (e) => {
            if(containerRef.current && !containerRef.current.contains(e.target)){
                closeModal()
            }
        }

        document.body.addEventListener("mousedown",handleClickOutside)
        return () => document.body.removeEventListener("mousedown",handleClickOutside)
    },[])

    //handleDataSubmit
    const handleSubmit = (e) => {
        if(!localData.title || !localData.subtasks.every(subtask => subtask.title)){
            console.log("Error")
            return
        }
        
        if(variant==="add"){
            addTaskSubmit(boardData,status, localData)
            closeModal()
        }
        if(variant==="edit"){
           editTaskSubmit(localData.id,getStatus(data.boards, taskData.id) , status, localData)
           closeModal()
        }   
    }

    const boardData = boardDataProp || getBoardByTaskId(data.boards, taskData?.id) 
    const statusNames = boardData.columns.map(col => col.name)

    
    const [status, setSelectedStatus] = React.useState(getStatus(data.boards, taskData?.id) || statusNames[0])


    //SetColumns
    const setSubtaskData = (newSubtaskData) => {
        setLocalData(prevData => ({...prevData, subtasks: newSubtaskData}))
    }

    return(
        <>
            <div className={styles.container} ref={containerRef}>
                <h1 className="h-l">{variant==="add"? "Add New Task":"Edit Task"}</h1>
                <TextInput
                    name="Title"
                    placeholder="e.g. Take coffee break"
                    text={localData.title}
                    setText={setTaskTitle}
                />
                <TextAreaInput
                    name="Description"
                    placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
                    text={localData.description}
                    setText={setTaskDescription}
                />
                <form className={styles.form}>
                    <TextInputsDeletable localData={localData.subtasks} variant="subtasks" setLocalData={setSubtaskData}/>
                </form>
                <CustomSelect optionsArr={statusNames} selectedOption={status} setSelectedOption={setSelectedStatus}/>
                <Button variant="primary-s" onClick={handleSubmit}>{variant==="add"? "Create New Board":"Save Changes"}</Button>
            </div>
            <PopUpBackground/>
        </>
    )
}