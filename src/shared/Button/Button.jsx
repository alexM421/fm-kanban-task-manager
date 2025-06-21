import React from "react";
import styles from "./Button.module.css"

import { Link } from "react-router-dom";

export default function Button ( { children, link, variant,onClick }) {



    return(
        <Link to={link}>
            <button 
            onClick={onClick}
            className={`${styles[variant]} ${variant==="primary"? "h-m":"b-m"} ${styles.button}`}
            >{children}</button>
        </Link>
    )
}