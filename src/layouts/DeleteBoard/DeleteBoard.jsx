import React from "react";
import styles from "./DeleteBoard.module.css"
import PopUpBackground from "../../components/PopUpBackground/PopUpBackground";
import Button from "../../components/Button/Button";
import useDisplayHandler from "../../hooks/useDisplayHandler";
import FindBoard from "../../features/findBoard";
import { useDataContext } from "../../contexts/DataContext";

    export default function DeleteBoard ({ setDisplayDelete }) {

        const { setData } = useDataContext()
        const containerRef = React.useRef(undefined)
        const displayHandler = useDisplayHandler()
        displayHandler(containerRef, setDisplayDelete)

        const currentBoard = FindBoard()
        const handleDelete = () => {
            setData(prevData => {
                const toUpdateArr = [...prevData.boards]
                toUpdateArr.splice(currentBoard.index,1)
                return {...prevData, boards:  toUpdateArr}
            })
            setDisplayDelete(false)
        }
           
        return(
            <>
                <div className={styles.container} ref={containerRef}>
                    <h1 className="h-l">Delete this board?</h1>
                    <p className="b-l">Are you sure you want to delete the ‘Platform Launch’ board? This action will remove all columns and tasks and cannot be reversed.</p>
                    <div className={styles.btns}>
                        <Button variant="delete" onClick={handleDelete} link="/">Delete</Button>
                        <Button variant="secondary">Cancel</Button>
                    </div>
                </div>
                <PopUpBackground/>
            </>
        )
    }