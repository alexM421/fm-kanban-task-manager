import React from "react";
//contexts
import { useDataContext } from "../../../contexts/DataContext";
import { getBoardByTaskId, getTask, getTaskArr } from "../../../utils/utils";


export default function useAddTaskSubmit () {

    const { data, setData } = useDataContext()

 

    const addTaskSubmit = ( boardData , newStatus, localData ) => {
        //Delete the old Status

        const taskData = localData
  

        const updatedBoardData =  
            {
                ...boardData,
                columns: boardData.columns.map(column => {
                    if(column.name === newStatus){
                        const updateNewStatusArr = [...column.tasks]
                        updateNewStatusArr.push(taskData)
                        return {...column, tasks: updateNewStatusArr}
                    }
                    return column
                })
            }
        setData(prevData => ({
            ...prevData,
            boards: prevData.boards.map(board => board.id===boardData.id? updatedBoardData:board)
        }))
    }

    return addTaskSubmit
}