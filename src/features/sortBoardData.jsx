import React from "react"

export default function sortBoardData ( currentBoard, setData ) {
    
  
    const boardIndex = currentBoard.index

    //first get all tasks into one list
 

    //Then rearrange the data
    setData(prevData => {


        const boardData = {...prevData.boards[boardIndex]} 
        const taskLists = []
        const columns = boardData.columns

        for(let column of columns){
            if(column.tasks){
                for(let task of column.tasks){
                    taskLists.push(task)
                }
            }
        }
        
        const toUpdateBoardData = [...prevData.boards]

        const updatedColumnsArr = []
        for(let column of columns){

            const updatedTasksArr = []

            for(let task of taskLists){
                if(task.status===column.name){
                    updatedTasksArr.push(task)
                } 
            }

            updatedColumnsArr.push({
                ...column,
                tasks: updatedTasksArr
            })
        }

        toUpdateBoardData[boardIndex] = {
            ...toUpdateBoardData[boardIndex],
            columns: updatedColumnsArr,
        }

        console.log(toUpdateBoardData)

        return({
            ...prevData,
            boards: toUpdateBoardData
        })
    })
}