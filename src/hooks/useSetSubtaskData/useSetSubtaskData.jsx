import React from "react";
//contexts
import { useDataContext } from "../../contexts/DataContext";

export default function useSetSubtaskData () {

    const { setData } = useDataContext()

    const setSubtaskData = (updatedSubtaskArr, subtaskId) => {
        setData((prevData) => {
            return{
                ...prevData,
                boards: prevData.boards.map(board => ({
                    ...board,
                    columns: board.columns.map(column => ({
                        ...column,
                        tasks: column.tasks.map(task => {
                            const hasSubtaskId = task.subtasks.some(subtask => subtask.id === subtaskId)
                            if(hasSubtaskId){
                                return {...task, subtasks: updatedSubtaskArr}
                            }
                            return task
                        })
                    }))
                }))
            }
        })
    }


    return setSubtaskData
}