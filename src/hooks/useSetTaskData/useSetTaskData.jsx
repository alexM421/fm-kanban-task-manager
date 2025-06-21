import React from "react";
//contexts
import { useDataContext } from "../../contexts/DataContext";

export default function useSetTaskData () {

    const { setData } = useDataContext()

    const setTaskData = (updatedTaskArr, taskId) => {
        setData((prevData) => {
            return{
                ...prevData,
                boards: prevData.boards.map(board => ({
                    ...board,
                    columns: board.columns.map(column => {
                        const hasTaskId = column.tasks.some(task => task.id === taskId)
                        if(hasTaskId){
                            return({
                                ...column,
                                tasks: updatedTaskArr
                            })
                        }
                        return column
                    })
                }))
            }
        })
    }

    return setTaskData
}