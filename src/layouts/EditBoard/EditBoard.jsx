import React from "react";
import styles from "./EditBoard.module.css"

import TextInput from "../../components/TextInput/TextInput";
import ColumnInput from "../../components/ColumnInput/ColumnInput";
import Button from "../../components/Button/Button";
import PopUpBackground from "../../components/PopUpBackground/PopUpBackground";
import { useDataContext } from "../../contexts/DataContext";
import useDisplayHandler from "../../hooks/useDisplayHandler";
import FindBoard from "../../features/findBoard";

export default function EditBoard ({ setDisplayEditBtn }) {

    const {setData} = useDataContext()

    const boardData = FindBoard().board
    const boardIndex = FindBoard().index   

    const [currentBoard, setCurrentBoard] = React.useState(boardData)
    

    //Title onchange handler
    const setText = (e) => {
        setCurrentBoard(prevState => ({...prevState, name: e.target.value}))
    } 

    //Handling Window Display
    const containerRef = React.useRef(undefined)

    const displayHandler = useDisplayHandler()
    displayHandler(containerRef,setDisplayEditBtn)

    const handleSubmit = (e) => {
        if(!currentBoard.name || !currentBoard.columns.every(col => col.name)){
            console.log("Error")
            return
        }
        setData(prevData => {
            const toUpdateArr = [...prevData.boards]
            toUpdateArr[boardIndex] = currentBoard
            setDisplayEditBtn(false)
            return({
                boards: toUpdateArr
            })
        })
    }

    return(
        <>
            <div className={styles.container} ref={containerRef}>
                <h1 className="h-l">{`Edit Board`}</h1>
                <TextInput
                    name="Title"
                    placeholder="e.g. Take coffee break"
                    text={currentBoard.name}
                    setText={setText}
                />
                <form className={styles.form}>
                    <ColumnInput newBoard={currentBoard} setNewBoard={setCurrentBoard}/>
                </form>
                <Button variant="primary-s" onClick={handleSubmit}>Save changes</Button>
            </div>
            <PopUpBackground/>
        </>
    )
}