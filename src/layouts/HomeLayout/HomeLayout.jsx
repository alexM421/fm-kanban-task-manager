import React from "react";
import styles from "./HomeLayout.module.css"
import { Outlet } from "react-router-dom";

import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import AddNewBoard from "../AddNewBoard/AddNewBoard";

export default function HomeLayout () {

    const [sidebarHidden, setSidebarHidden] = React.useState(false)

    return(
        <div className={styles.container}>
            <Sidebar isHidden={sidebarHidden} setIsHidden={setSidebarHidden}/>
            <div className={styles.content}>
                <Navbar sidebarHidden={sidebarHidden}/>
                <Outlet/>
            </div>
        </div>
    )
}