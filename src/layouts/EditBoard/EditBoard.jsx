import React from "react";
import styles from "./EditBoard.module.css"

import TextInput from "../../components/TextInput/TextInput";
import ColumnInput from "../../components/ColumnInput/ColumnInput";
import Button from "../../components/Button/Button";
import PopUpBackground from "../../components/PopUpBackground/PopUpBackground";
import { useDataContext } from "../../contexts/DataContext";
import useDisplayHandler from "../../hooks/useDisplayHandler";

export default function EditBoard ({ setDisplayEditBtn }) {

    const {setData} = useDataContext()

    const [newBoard, setNewBoard] = React.useState({
        name: "",
        columns: []
    })

    //Title onchange handler
    const setText = (e) => {
        setNewBoard(prevState => ({...prevState, name: e.target.value}))
    } 

    //Handling Window Display
    const containerRef = React.useRef(undefined)

    const displayHandler = useDisplayHandler()
    displayHandler(containerRef,setDisplayEditBtn)

    const handleSubmit = (e) => {
        if(!newBoard.name || !newBoard.columns.every(col => col.name)){
            console.log("Error")
            return
        }
        setData(prevData => {
            const toUpdateArr = [...prevData.boards]
            toUpdateArr.push(newBoard)
            setDisplayEditBtn(false)
            return({
                boards: toUpdateArr
            })
        })
    }

    return(
        <>
            <div className={styles.container} ref={containerRef}>
                <h1 className="h-l">Add New Board</h1>
                <TextInput
                    name="Title"
                    placeholder="e.g. Take coffee break"
                    text={newBoard.name}
                    setText={setText}
                />
                <form className={styles.form}>
                    <ColumnInput newBoard={newBoard} setNewBoard={setNewBoard}/>
                </form>
                <Button variant="primary-s" onClick={handleSubmit}>Create New Board</Button>
            </div>
            <PopUpBackground/>
        </>
    )
}