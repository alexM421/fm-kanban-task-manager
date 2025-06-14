import React from "react";
import styles from "./ColumnInput.module.css"
import Button from "../Button/Button";
import TextInput from "../TextInput/TextInput";
import IconCross from "../../assets/IconCross";

export default function ColumnInput ({newBoard, setNewBoard}) {


    const addNewColumn = () => {
        setNewBoard(prevState => {
            const toUpdateArr = [...prevState.columns]
            toUpdateArr.push({
                name: "",
                tasks: [],
            })
            return {...prevState, columns: toUpdateArr}
        })
    }


    const handleDelete = (index) => {
         setNewBoard(prevState => {
            const toUpdateArr = [...prevState.columns]
            toUpdateArr.splice(index,1)
            return {...prevState, columns: toUpdateArr}
        })
    }
 

    return(
        <div className={styles.container}>
            <p className="b-m">Columns</p>
            <div className={styles["cols"]}>
                {newBoard.columns.map((col,index) => {

                    const setText = (e) => {
                        setNewBoard(prevState => {
                            const toUpdateArr = [...prevState.columns]
                            toUpdateArr[index].name = e.target.value
                            return {...prevState, columns: toUpdateArr}
                        })
                    }
                    
                    return(
                        <div className={styles["col-input"]}>
                            <TextInput 
                            placeholder="e.g Todo"
                            text={col.name}
                            setText={setText}
                            />
                            <div 
                            className={styles["delete-btn"]}
                            onClick={() => handleDelete(index)}
                            >
                                <IconCross/>
                            </div>
                        </div>
                    )
                })}
                <Button onClick={addNewColumn} variant="secondary">+ Add New Column</Button>
            </div>
        </div>
    )
}