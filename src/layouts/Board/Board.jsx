import React from "react";
import styles from "./Board.module.css"
import { useParams  } from "react-router-dom";
import { useDataContext } from "../../contexts/DataContext";
import slugify from "../../features/slugify/slugify";
import Button from "../../components/Button/Button";
import BoardColumn from "../../components/BoardColumn/BoardColumn";
import FindBoard from "../../features/findBoard";

export default function Board () {

    const [displayTask, setDisplayTask] = React.useState(false)

    //Getting the board data
    const { data, setData } = useDataContext()
    const { boardName } = useParams()
    const currentBoard = FindBoard()
    const boardData = currentBoard.board
    const boardIndex = currentBoard.index
    const noBoardData = 
        <div className={styles["no-data"]}>
            <h1 className="h-l">This board is empty. Create a new column to get started.</h1>
            <Button variant="primary">+ Add New Column</Button>   
        </div>


    const setColumnData = (newColumnData,index) => {
        setData(prevData => {
            


            const toUpdateBoardsArr = [...prevData.boards]
            const toUpdateColsArr = [...boardData.columns]
            //Updating Column Data
            toUpdateColsArr[index] = newColumnData
            
            toUpdateBoardsArr[boardIndex] = {
                ...boardData,
                columns: toUpdateColsArr,
            }
            
            return(
                {
                    ...prevData,
                    boards: toUpdateBoardsArr,
                }
            )   
        })
    }
    
 

    const boardColumns = boardData?.columns.map((column,index) => 
        <BoardColumn 
            columnData={column}  
            setColumnData={setColumnData} 
            index={index} 
            key={`col-${column.name}`}
            displayTask={displayTask}
            setDisplayTask={setDisplayTask}
            />
        )


    return(
        <div className={styles.container}>
            {boardData.columns
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