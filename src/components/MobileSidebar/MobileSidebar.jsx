import React from "react";
import styles from "./MobileSidebar.module.css"
//assets
import IconChevronDown from "../../assets/IconChevronDown";
//hooks
import useBoardBySlug from "../../hooks/useBoardBySlug/useBoardBySlug";
//Features
import SidebarBoardItem from "../../features/Sidebar/SidebarBoardItem/SidebarBoardItem";
import ThemeSwitchButton from "../../features/Sidebar/ThemeSwitchButton/ThemeSwitchButton";
//utils
import { toggleState } from "../../utils/utils";
//contexts
import { useDataContext } from "../../contexts/DataContext";
import { useModalContext } from "../../contexts/ModalContext";
//modals
import BoardModal from "../../modals/BoardModal/BoardModal";


export default function MobileSidebar () {

    const { data } = useDataContext()
    const { closeModal, openModal} = useModalContext()
    const boardData = useBoardBySlug()


    const [displaySidebar, setDisplaySidebar] = React.useState(false)
    const [displayAddBoardModal, setDisplayAddBoardModal] = React.useState(false)

    const btnRef = React.useRef(null)
    const sidebarRef = React.useRef(null)

    React.useEffect(() => {
        console.log("ran")
        const handleClickOutside = (e) => {
            const isInsideBtn = btnRef.current.contains(e.target)
            const isInsideSidebar = sidebarRef.current.contains(e.target)

            console.log(isInsideBtn)
            if(!isInsideBtn && !isInsideSidebar){
                setDisplaySidebar(false)
            }
        }
        document.body.addEventListener("mousedown", handleClickOutside)
        return () => document.body.removeEventListener("mousedown",handleClickOutside)

    },[])

        
    React.useEffect(() => {
        setDisplaySidebar(false)
        displayAddBoardModal
            ?openModal(
                <BoardModal 
                    setDisplayModal={setDisplayAddBoardModal}
                />
            )
            :closeModal()
    },[displayAddBoardModal])

    return(
        <div className={styles.container}>
            <div className={`${styles.btn} ${displaySidebar? styles["chevron-up"]:""}`}  ref={btnRef}  onClick={() => toggleState(setDisplaySidebar)}>
                <img src="/assets/logo-mobile.svg"/>
                <h1 className="h-l">{boardData?.name || ""}</h1>
                <IconChevronDown/>
            </div>
            <div className={`${styles.sidebar} ${!displaySidebar? styles.hidden:""}`} ref={sidebarRef}>
                <div className={styles.boards}>
                    <h1 className="h-s">{`ALL BOARDS(${data.boards.length})`}</h1>
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
                <div className={styles.bottom}>
                    <ThemeSwitchButton/>
                </div>
            </div>
            {displaySidebar? <div className={styles["popup-bg"]}></div>:""}
        </div>
    )
}