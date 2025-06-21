import React from "react";
import styles from "./Board.module.css"
//hooks
import useBoardBySlug from "../../hooks/useBoardBySlug/useBoardBySlug";
//shared
import Button from "../../shared/Button/Button";
//components
import BoardColumn from "../../components/BoardColumn/BoardColumn";
//modals
import BoardModal from "../../modals/BoardModal/BoardModal";
//utils
import { getStatusColor, toggleState } from "../../utils/utils";
//contexts
import { useModalContext } from "../../contexts/ModalContext";

export default function Board ({isSidebarActive}) {

    const boardData = useBoardBySlug()

    const { closeModal, openModal } = useModalContext()
    const [displayEditModal, setDisplayEditModal] = React.useState(false)

    const noBoardData = 
        <div className={styles["no-data"]}>
            <h1 className="h-l">This board is empty. Create a new column to get started.</h1>
            <Button variant="primary">+ Add New Column</Button>   
        </div>
    
    const boardColumns = boardData?.columns.map((column,index) => 
        <BoardColumn 
            columnData={column}  
            key={`col-${column.id}`}
            statusColor={getStatusColor(index)}
            />
        )


        const EditModal = <BoardModal variant="edit" setDisplayModal={setDisplayEditModal} boardData={boardData}/>
        
        React.useEffect(() => {
            displayEditModal? openModal(EditModal):closeModal()
        },[displayEditModal])
    
    
        



    return(
        <div className={`${styles.container} ${isSidebarActive? styles["sidebar-active"]:""}`}>
            {(boardData && boardData?.columns.length)
            ?<> 
                {boardColumns}
                <div className={styles["new-col"]} onClick={() => toggleState(setDisplayEditModal)}>
                    <h1 className="h-xl">+ New Column</h1>
                </div>
            </>
            :noBoardData}
        </div>
    )
}