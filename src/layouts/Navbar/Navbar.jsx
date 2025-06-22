import React from "react";
import styles from "./Navbar.module.css"
//assets
import Logo from "../../assets/Logo";
//shared
import Button from "../../shared/Button/Button";
//components
import EditBtn from "../../components/EditBtn/EditBtn"
//hooks
import useBoardBySlug from "../../hooks/useBoardBySlug/useBoardBySlug";
//utils
import { toggleState } from "../../utils/utils";
//contexts
import { useModalContext } from "../../contexts/ModalContext";
import ChangeTaskModal from "../../modals/ChangeTaskModal/ChangeTaskModal";
import useIsMobile from "../../hooks/useIsMobile/useIsMobile";
import IconAddTaskMobile from "../../assets/IconAddTaskMobile";
import MobileSidebar from "../../components/MobileSidebar/MobileSidebar";

export default function Navbar ( { sidebarHidden }) {

    const isMobile = useIsMobile()
    const boardData = useBoardBySlug()

    const { closeModal, openModal } = useModalContext()

    const [changeTaskModalDisplay, setChangeTaskModalDisplay] = React.useState(false)

    const changeModal = 
        <ChangeTaskModal 
        variant="add" 
        setDisplayModal={setChangeTaskModalDisplay} 
        boardDataProp={boardData}
        />
    
    React.useEffect(() => {
        changeTaskModalDisplay? openModal(changeModal):closeModal()
    },[changeTaskModalDisplay])
        
        
    const desktopLayout = 
        <>
            <div className={styles["logo-div"]}>
                <Logo/>
                <div className={styles.line}></div>
            </div>
            <h1 className="h-xl">{boardData?.name || ""}</h1>
        </>

    const mobileLayout = 
        <>
            <MobileSidebar/>
        </>

    return(
        <div className={`${styles.container} ${!sidebarHidden? styles["sidebar-shown"]:""}`}>
            <div className={styles.left}>
                {isMobile? mobileLayout:desktopLayout}
            </div>
            <div className={`${styles.right} ${boardData? "":styles["disable-btns"]}`}>
                <Button
                variant="primary"
                onClick={() => toggleState(setChangeTaskModalDisplay)}
                >{isMobile? <IconAddTaskMobile/>:"+ Add New Task"}</Button>
                <EditBtn localData={boardData}/>
            </div>
        </div>
    )
}