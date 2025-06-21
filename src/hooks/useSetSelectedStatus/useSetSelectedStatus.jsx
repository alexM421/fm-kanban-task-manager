import React from "react";
//contexts
import { useDataContext } from "../../contexts/DataContext";
import { getBoardByTaskId, getTask, getTaskArr } from "../../utils/utils";


export default function useSetSelectedStatus () {

    const { data, setData } = useDataContext()

 

    const setSelectedStatus = ( taskId, oldStatus, newStatus ) => {
        //Delete the old Status

        if(oldStatus===newStatus){
            setData(prevData => prevData)
            return
        }

        const boards = [...data.boards]
        const taskData = getTask(boards,taskId)
        const boardData = getBoardByTaskId(data.boards,taskId)
        
        const updateOldStatusArr =  getTaskArr(boards,taskId)
        const oldStatusArrIndex = updateOldStatusArr.findIndex(task => task.id === taskId)
        updateOldStatusArr.splice(oldStatusArrIndex,1)
        
        console.log(boardData)
        const updatedBoardData =  
            {
                ...boardData,
                columns: boardData.columns.map(column => {
                    if(column.name === oldStatus){
                        return {...column, tasks: updateOldStatusArr}
                    }if(column.name === newStatus){
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

    return setSelectedStatus
}