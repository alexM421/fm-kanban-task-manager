import React from "react";
import styles from "./Sidebar.module.css"

//Context
import { useDataContext } from "../../contexts/DataContext";
import { useModalContext } from "../../contexts/ModalContext";
//Assets
import Logo from "../../assets/Logo";
//Features
import SidebarBoardItem from "../../features/Sidebar/SidebarBoardItem/SidebarBoardItem";
import ThemeSwitchButton from "../../features/Sidebar/ThemeSwitchButton/ThemeSwitchButton";
import HideSidebarButton from "../../features/Sidebar/HideSidebarButton/HideSidebarButton";
//Modals
import BoardModal from "../../modals/BoardModal/BoardModal";
import { toggleState } from "../../utils/utils";


export default function Sidebar ({ isHidden, setIsHidden }) {

    //Contexts
    const { data } = useDataContext()
    const { closeModal, openModal } = useModalContext()
    //ModalDisplay State
    const [displayAddBoardModal, setDisplayAddBoardModal] = React.useState(false)
    
    React.useEffect(() => {
        displayAddBoardModal
            ?openModal(
                <BoardModal 
                    setDisplayModal={setDisplayAddBoardModal}
                />
            )
            :closeModal()
    },[displayAddBoardModal])

    return(
        <div className={`${styles.container} ${isHidden? styles.hidden:""}`}>
            <div className={styles.top}>
                <Logo/>
                <div className={styles.boards}>
                    <h1 className="h-s">{`All Boards(${data.boards.length})`}</h1>
                    <div className={styles["board-list"]}>
                        {data.boards.map((board) => 
                            <SidebarBoardItem
                                boardName={board.name} 
                                key={`board-item-${board.id}`}
                            />
                        )}
                        <SidebarBoardItem 
                            boardName="+Create New Board" 
                            variant="button"
                            onClick={() => toggleState(setDisplayAddBoardModal)}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.bottom}>
                <ThemeSwitchButton/>
                <HideSidebarButton isHidden={isHidden} setIsHidden={setIsHidden}/>
            </div>
        </div>
    )
}