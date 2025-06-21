import React from "react";
import styles from "./EditBtn.module.css"
import { createPortal } from "react-dom";
//assets
import IconEllipsis from "../../assets/IconEllipsis";
//hooks
import useDisplayHandler from "../../hooks/useDisplayHandler/useDisplayHandler";
import useBoardBySlug from "../../hooks/useBoardBySlug/useBoardBySlug";
//contexts
import { useModalContext } from "../../contexts/ModalContext";
//utils
import { toggleState } from "../../utils/utils";
//modals
import BoardModal from "../../modals/BoardModal/BoardModal";
import DeleteModal from "../../modals/DeleteModal/DeleteModal";
import ChangeTaskModal from "../../modals/ChangeTaskModal/ChangeTaskModal";

export default function EditBtn ({variant="board", localData}) {

    const [displayEditBtn, setDisplayEditBtn] = React.useState(false)
    const [displayEditModal, setDisplayEditModal] = React.useState(false)
    const [displayDeleteModal, setDisplayDeleteModal] = React.useState(false)

    const containerRef = React.useRef(undefined)
    const ellipsisRef = React.useRef(undefined)
    const displayHandler = useDisplayHandler()
    displayHandler(containerRef, setDisplayEditBtn, ellipsisRef)

    
    const { openModal, closeModal, modalContent } = useModalContext()


    // React.useEffect(() => {
    //     displayEditModal? openModal(<BoardModal variant="edit" setDisplayModal={setDisplayEditModal} boardData={boardData}/>):closeModal()
    // },[displayEditModal])
    
    // React.useEffect(() => {
    //     displayDeleteModal? openModal(<DeleteModal setDisplayModal={setDisplayDeleteModal} elementData={boardData}/>):closeModal()
    // },[displayDeleteModal])

    const isFirstRenderEdit = React.useRef(true);
    const isFirstRenderDelete = React.useRef(true);
    const EditModal = variant==="board"
        ?<BoardModal variant="edit" setDisplayModal={setDisplayEditModal} boardData={localData}/>
        :<ChangeTaskModal variant="edit" setDisplayModal={setDisplayEditModal} taskData={localData}/>


    React.useEffect(() => {
        if(isFirstRenderEdit.current){
            isFirstRenderEdit.current = false

        }else{
            displayEditModal
                ?openModal(EditModal)
                :closeModal()
        }
    },[displayEditModal])

    
    React.useEffect(() => {
        if(isFirstRenderDelete.current){
            isFirstRenderDelete.current = false
     
        }else{
            console.log("running")
            displayDeleteModal
                ?openModal(<DeleteModal variant={variant} setDisplayModal={setDisplayDeleteModal} elementData={localData}/>)
                :closeModal()
        }
    },[displayDeleteModal])

    return(
        <>
            <div className={styles.container}>
                <button className={styles.ellipsis} onClick={() => toggleState(setDisplayEditBtn)} ref={ellipsisRef}>
                    <IconEllipsis/>
                </button>
                <div className={`${styles.btns} ${!displayEditBtn? styles.hidden:""}`} ref={containerRef}>
                    <button className="b-l" onClick={() => toggleState(setDisplayEditModal)}>{variant==="board"? "Edit Board":"Edit Task"}</button>
                    <button className="b-l" onClick={() => toggleState(setDisplayDeleteModal)}>{variant==="board"? "Delete Board":"Delete Task"}</button>   
                </div>
            </div>
            {/* {displayEditModal && createPortal(EditModal,document.getElementById("modal-root"))} */}
            {/* {displayDeleteModal && createPortal(<DeleteModal variant={variant} setDisplayModal={setDisplayDeleteModal} elementData={localData}/>,document.getElementById("modal-root"))} */}
        </>
    )
}