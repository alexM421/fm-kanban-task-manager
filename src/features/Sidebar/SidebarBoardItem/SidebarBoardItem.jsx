import React from "react";
import styles from "./SidebarBoardItem.module.css"

import { Link, useParams } from "react-router-dom";

//utils
import { slugify } from "../../../utils/utils";
//assets
import IconBoard from "../../../assets/IconBoard";

export default function SidebarBoardItem ({ boardName, variant="default", onClick }) {

    const slug = useParams().boardSlug

    return(
        <Link 
        onClick={onClick}
        className={`${styles.container} ${slug===slugify(boardName)? styles.selected:""} ${styles[variant]}`}
        to={`${variant!=="button"? slugify(boardName):"#"}`}
        >
            <IconBoard/>
            <h2 className="h-m">{boardName}</h2>
        </Link>
    )
}