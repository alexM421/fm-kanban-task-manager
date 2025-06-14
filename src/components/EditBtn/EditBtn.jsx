import React from "react";
import styles from "./EditBtn.module.css"

import IconEllipsis from "../../assets/IconEllipsis";
import { createPortal } from "react-dom";
import DeleteBoard from "../../layouts/DeleteBoard/DeleteBoard";
import useDisplayHandler from "../../hooks/useDisplayHandler";
import EditBoard from "../../layouts/EditBoard/EditBoard"

export default function EditBtn ({variant="board"}) {

    const [displayEditBtn, setDisplayEditBtn] = React.useState(false)
    const [displayDeleteBtn, setDisplayDeleteBtn] = React.useState(false)

    const toggleDisplayEditBtn = () => {setDisplayEditBtn(prevState => !prevState)}
    const toggleDisplayDeleteBtn = () => {setDisplayDeleteBtn(prevState => !prevState)}


    const containerRef = React.useRef(undefined)
    const ellipsisRef = React.useRef(undefined)
    const displayHandler = useDisplayHandler()
    
    displayHandler(containerRef, setDisplayEditBtn, ellipsisRef)
    
    return(
        <div className={styles.container}>
            <button className={styles.ellipsis} onClick={toggleDisplayEditBtn} ref={ellipsisRef}>
                <IconEllipsis/>
            </button>
            <div className={`${styles.btns} ${!displayEditBtn? styles.hidden:""}`} ref={containerRef}>
                <button className="b-l">Edit Board</button>
                <button className="b-l" onClick={toggleDisplayDeleteBtn}>Delete Board</button>   
            </div>
            {displayDeleteBtn && createPortal(<DeleteBoard setDisplayDelete={setDisplayDeleteBtn}/>,document.body)}
            {displayEditBtn && createPortal(<EditBoard setDisplayEditBtn={setDisplayEditBtn}/>,document.body)}
        </div>
    )
}