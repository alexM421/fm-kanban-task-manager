import React from "react";
import styles from "./HideSidebarButton.module.css"
//assets
import IconHideSidebar from "../../../assets/IconHideSIdebar";

export default function HideSidebarButton ({isHidden, setIsHidden}) {

    const displayNotHidden = 
        <>
            <IconHideSidebar/>
            <p className="h-m">Hide Sidebar</p>
        </>

    return(
        <>
            <label 
            className={styles.container}
            htmlFor="hide-sidebar-btn"
            >
                <input type="checkbox"
                id="hide-sidebar-btn"
                value={isHidden}
                onChange={() => setIsHidden(prevState => !prevState)}
                />

                {displayNotHidden}  
            </label>
            
            <label 
            className={`${styles["show-sidebar-btn"]} ${isHidden? styles.show:""}`}
            htmlFor="hide-sidebar-btn"
            >
                <img src="/assets/icon-show-sidebar.svg"/>
            </label>
        </>
    )
}