import React from "react";
//contexts
import { useDataContext } from "../../../contexts/DataContext";
//utils
import { getBoardByTaskId, getTask, getTaskArr } from "../../../utils/utils";
//hooks
import useSetTaskData from "../../../hooks/useSetTaskData/useSetTaskData";


export default function useEditTaskSubmit () {

    const { data, setData } = useDataContext()

    const setTaskData = useSetTaskData()
 

    const editTaskSubmit = ( taskId, oldStatus, newStatus, localData ) => {
        //Delete the old Status

        
        const boards = [...data.boards]
        const taskData = localData
        const boardData = getBoardByTaskId(data.boards,taskId)
        
        const updateOldStatusArr =  getTaskArr(boards,taskId)    
        if(oldStatus===newStatus){
            const updatedArr =  updateOldStatusArr.map(task => {
                if(task.id===taskId){
                    return localData
                }
                return task
            })
    
            setTaskData(updatedArr, taskId)
            return
        }
        const oldStatusArrIndex = updateOldStatusArr.findIndex(task => task.id === taskId)
        updateOldStatusArr.splice(oldStatusArrIndex,1)

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

    return editTaskSubmit
}