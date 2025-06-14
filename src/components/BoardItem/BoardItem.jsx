import React from "react";
import styles from "./BoardItem.module.css"

import { Link, useParams } from "react-router-dom";

import slugify from "../../features/slugify/slugify";
import IconBoard from "../../assets/IconBoard";

export default function BoardItem ({ boardName, variant="default", onClick }) {


    const slug = useParams().boardName



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