import React from "react";
import styles from "./Board.module.css"
import { useParams  } from "react-router-dom";
import { useDataContext } from "../../contexts/DataContext";
import slugify from "../../features/slugify/slugify";
import Button from "../../components/Button/Button";
import BoardColumn from "../../components/BoardColumn/BoardColumn";

export default function Board () {

    //Getting the board data
    const { data } = useDataContext()
    const { boardName } = useParams()
    const boardData = data.boards[data.boards.findIndex(board => slugify(board.name)===boardName)]

    const noBoardData = 
        <div className={styles["no-data"]}>
            <h1 className="h-l">This board is empty. Create a new column to get started.</h1>
            <Button variant="primary">+ Add New Column</Button>   
        </div>


    const boardColumns = boardData?.columns.map((column,index) => <BoardColumn columnData={column} index={index} key={`col-${index}`}/>)


    return(
        <div className={styles.container}>
            {boardData?.columns
            ?<>
                {boardColumns}
                <div className={styles["new-col"]}>
                    <h1 className="h-xl">+ New Column</h1>
                </div>
            </>
            :noBoardData}
        </div>
    )
}