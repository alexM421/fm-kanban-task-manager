import React from "react";
import styles from "./TextInputsDeletable.module.css"
//shared
import Button from "../../../shared/Button/Button";
import TextInput from "../../../shared/TextInput/TextInput";
//assets
import IconCross from "../../../assets/IconCross";
import { nanoid } from "nanoid";

export default function TextInputsDeletable ({ setLocalData, localData, variant="columns"}) {


    const addNewInput = () => {
        const toUpdateArr = [...localData]
        if(variant==="columns"){
            toUpdateArr.push({name: "",tasks: [], id: nanoid()})
        }
        if(variant==="subtasks"){
            toUpdateArr.push({title: "", isCompleted: false, id: nanoid()})
        }
        setLocalData(toUpdateArr)
    }

    const handleDelete = (index) => {
        const toUpdateArr = [...localData]
        toUpdateArr.splice(index,1)
        setLocalData(toUpdateArr)
    }
    



    return(
        <div className={styles.container}>
            <p className="b-m">{variant==="columns"?"Columns":"Subtasks"}</p>
            <div className={styles["elements-list"]}>
                {localData.map((element,index) => {

                    const setText = (e) => {
                        const toUpdateData = localData.map((el, i) => 
                            i===index
                                ? {...el, [variant==="columns"? "name":"title"]: e.target.value}
                                : el
                        )
                        setLocalData(toUpdateData)
                    }

                    return(
                        <div className={styles["element-input"]} key={element.id}>
                            <TextInput 
                            placeholder={variant==="columns"? "e.g Todo":"Make Coffee"}
                            text={element[variant==="columns"?"name":"title"]}
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
                <Button onClick={addNewInput} variant="secondary">{`+ Add New ${variant==="columns"? "Column":"Subtask"}`}</Button>
            </div>
        </div>
    )
}