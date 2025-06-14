import React from "react";
import styles from "./Sidebar.module.css"

import Logo from "../../assets/Logo";
import BoardItem from "../../components/BoardItem/BoardItem";

import { useDataContext } from "../../contexts/DataContext";
import ThemeSwitchButton from "../../features/ThemeSwitchButton/ThemeSwitchButton";
import HideSidebarButton from "../../features/HideSidebarButton/HideSidebarButton";
import { createPortal } from 'react-dom';
import AddNewBoard from "../AddNewBoard/AddNewBoard";

export default function Sidebar ({ isHidden, setIsHidden }) {

    const { data } = useDataContext()
    const boards = data.boards

    const [addBoard, setAddBoard] = React.useState(false)
    const handleAddBoardDisplay = () => {
        setAddBoard(true)
    }

    return(
        <div className={`${styles.container} ${isHidden? styles.hidden:""}`}>
            <div className={styles.top}>
                <Logo/>
                <div className={styles.boards}>
                    <h1 className="h-s">All boards (3)</h1>
                    <div className={styles["board-list"]}>
                        {boards.map((board,index) => 
                            <BoardItem 
                                boardName={board.name} 
                                key={`board-item-${index}`}
                            />
                        )}
                        <BoardItem 
                            boardName="+Create New Board" 
                            variant="button"
                            onClick={handleAddBoardDisplay}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.bottom}>
                <ThemeSwitchButton/>
                <HideSidebarButton isHidden={isHidden} setIsHidden={setIsHidden}/>
            </div>
            {addBoard && createPortal(<AddNewBoard setAddBoard={setAddBoard}/>,document.body)}
        </div>
    )
}