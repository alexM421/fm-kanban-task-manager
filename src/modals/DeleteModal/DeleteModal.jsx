import React from "react";
import styles from "./DeleteModal.module.css"
//features
import PopUpBackground from "../../features/modals/PopUpBackground/PopUpBackground";
//shared
import Button from "../../shared/Button/Button";
//hooks
import useSetTaskData from "../../hooks/useSetTaskData/useSetTaskData";
//contexts
import { useDataContext } from "../../contexts/DataContext";
import { useModalContext } from "../../contexts/ModalContext";
//utils
import { getTaskArr } from "../../utils/utils";
import { useLocation, useParams } from "react-router-dom";

    export default function DeleteModal ({ setDisplayModal, elementData, variant="board" }) {

        const { data,setData } = useDataContext()

        const location = useLocation().pathname

        const { closeModal } = useModalContext()

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

        //handleDelete
        const handleDelete = (id, updatedElementArr, setElementData) => {
            const index = updatedElementArr.findIndex(element => element.id === id)
            updatedElementArr.splice(index,1)
            console.log(updatedElementArr)
            setElementData(updatedElementArr, id)
            closeModal()
        }

        const elementId = elementData.id
        //boards
        const updatedBoardArr = data.boards
        const setBoardData = (updatedBoardArr) => setData(prevData => ({...prevData, boards: updatedBoardArr}))
        //tasks
        const setTaskData = useSetTaskData()
        const updatedTaskArr = getTaskArr(data.boards,elementId)
        
        const handleDeleteBoard = () => {
            handleDelete(elementId, updatedBoardArr, setBoardData)
        }

        const handleDeleteTask = () => {
            handleDelete(elementId, updatedTaskArr, setTaskData)
        }
           
        
        

           
        return(
            <>
                <div className={styles.container} ref={containerRef}>
                    <h1 className="h-l">{`Delete this ${variant==="board"? "board":"task"}?`}</h1>
                    <p className="b-l">
                        {variant==="board"
                            ?`Are you sure you want to delete the "${elementData.name}" board? This action will remove all columns and tasks and cannot be reversed.`
                            :`Are you sure you want to delete the "${elementData.title}" task and its subtasks? This action cannot be reversed.`
                        }   
                    </p>
                    <div className={styles.btns}>
                        <Button variant="delete" onClick={variant==="board"? handleDeleteBoard:handleDeleteTask} link={variant==="board"? "/":`${location}`}>Delete</Button>
                        <Button variant="secondary" onClick={() => closeModal()}>Cancel</Button>
                    </div>
                </div>
                <PopUpBackground/>
            </>
        )
    }