import React from "react";
import styles from "./BoardModal.module.css"
import { nanoid } from "nanoid";
//Contexts
import { useDataContext } from "../../contexts/DataContext";
//Shared
import TextInput from "../../shared/TextInput/TextInput"
import Button from "../../shared/Button/Button";
//features
import PopUpBackground from "../../features/Modals/PopUpBackground/PopUpBackground";
import TextInputsDeletable from "../../features/Modals/TextInputsDeletable/TextInputsDeletable";
//hooks
import useDisplayHandler from "../../hooks/useDisplayHandler/useDisplayHandler";
import useBoardBySlug from "../../hooks/useBoardBySlug/useBoardBySlug";
import { useLocation, useParams } from "react-router-dom";

export default function BoardModal ({ setDisplayModal, variant="add", boardData }) {

    const { setData } = useDataContext()

    const [localData, setLocalData] = React.useState({name: "", columns: [], id: nanoid()})

    React.useEffect(() => {
        if(boardData){
            setLocalData(boardData)
        }
    },[])

    //Title onchange handler
    const setBoardName = (e) => {
        setLocalData(prevState => ({...prevState, name: e.target.value}))
    } 

    //Handling Window Display
    const containerRef = React.useRef(undefined)
    const displayHandler = useDisplayHandler()
    displayHandler(containerRef, setDisplayModal)

    //handleDataSubmit
    const handleSubmit = (e) => {
        if(!localData.name || !localData.columns.every(col => col.name)){
            console.log("Error")
            return
        }
        setData(prevData => {
            let toUpdateArr = [...prevData.boards]
            if(variant==="add"){
                toUpdateArr.push(localData)
            }else if(variant==="edit"){
                toUpdateArr = toUpdateArr.map(board => board.id === localData.id? localData:board)
            }
            return({
                boards: toUpdateArr
            })
        })

        setDisplayModal(false)
    }

    //SetColumns
    const setColumnData = (newColumnData) => {
        setLocalData(prevData => ({...prevData, columns: newColumnData}))
    }

    return(
        <>
            <div className={styles.container} ref={containerRef}>
                <h1 className="h-l">{variant==="add"? "Add New Board":"Edit Board"}</h1>
                <TextInput
                    name="Title"
                    placeholder="e.g. Take coffee break"
                    text={localData.name}
                    setText={setBoardName}
                />
                <form className={styles.form}>
                    <TextInputsDeletable localData={localData.columns} setLocalData={setColumnData}/>
                </form>
                <Button variant="primary-s" onClick={handleSubmit}>{variant==="add"? "Create New Board":"Save Changes"}</Button>
            </div>
            <PopUpBackground/>
        </>
    )
}