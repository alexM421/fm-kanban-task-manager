import React from "react";
import styles from "./HomeLayout.module.css"
import { Outlet } from "react-router-dom";

import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import useIsMobile from "../../hooks/useIsMobile/useIsMobile";


export default function HomeLayout () {

    const isMobile = useIsMobile()
    const [sidebarHidden, setSidebarHidden] = React.useState(false)

    const desktopDisplay = 
        <div className={styles.container}>
            <Sidebar isHidden={sidebarHidden} setIsHidden={setSidebarHidden}/>
            <div className={styles.content}>
                <Navbar sidebarHidden={sidebarHidden}/>
                <Outlet/>
            </div>
        </div>

    const mobileDisplay = 
        <div className={styles.container}>
            {/* <Sidebar isHidden={sidebarHidden} setIsHidden={setSidebarHidden}/> */}
            <div className={styles.content}>
                <Navbar sidebarHidden={sidebarHidden}/>
                <Outlet/>
            </div>
        </div>
    return (
        <>
            {isMobile? mobileDisplay: desktopDisplay}
        </>
    )
}