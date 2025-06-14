import React from "react";
import styles from "./Navbar.module.css"

import Logo from "../../assets/Logo";
import Button from "../../components/Button/Button";
import EditBtn from "../../components/EditBtn/EditBtn";

export default function Navbar ( { sidebarHidden }) {

   
    return(
        <div className={`${styles.container} ${!sidebarHidden? styles["sidebar-shown"]:""}`}>
            <div className={styles.left}>
                <div className={styles["logo-div"]}>
                    <Logo/>
                    <div className={styles.line}></div>
                </div>
                <h1 className="h-xl">Platform Launch</h1>
            </div>
            <div className={styles.right}>
                <Button
                variant="primary"
                >+ Add New Task</Button>
                <EditBtn/>
            </div>
        </div>
    )
}