import React from "react";


//Capitalize a string
export function capitalize (string = "") {
    return string.charAt(0).toUpperCase()+ string.slice(1)
}


//Transform a string in to a valid slug
export function slugify(str) {
  return str
    .toLowerCase()                    // Make lowercase
    .trim()                           // Remove leading/trailing spaces
    .replace(/[^a-z0-9\s-]/g, '')     // Remove non-alphanumeric (except space/hyphen)
    .replace(/\s+/g, '-')             // Replace spaces with hyphens
    .replace(/-+/g, '-');             // Collapse multiple hyphens
}

//Toggle State function
export function toggleState (setState) {
    setState(prevState => !prevState)
}

//Get columns color
export function getStatusColor (index) {

    const colors = [
    "#FF6B6B",
    "#6BCB77",
    "#4D96FF",
    "#FFD93D",
    "#845EC2",
    "#FF9671",
    "#00C9A7",
    "#B0A8B9",
    "#FFC75F",
    "#F9F871"
]

    if(index>colors.length-1){
        return "black"
    }
    return colors[index]
}

//GetBoardDataByTaskId
const getBoardByTaskId = (boards,taskId) => {

    for(let board of boards){
        for(let column of board.columns){
            for(let task of column.tasks){
                if(task.id===taskId){
                    return board
                }
            }  
        }
    }
} 

export {getBoardByTaskId}

//Get task array
const getTaskArr = (boards,id) => {
    for (let board of boards) {
        for (let column of board.columns) {
            for (let task of column.tasks) {
                if (task.id === id) {
                    return column.tasks
                }
            }
        }
    }
    return null
}

export { getTaskArr } 

//Get task by id

const getTask = (boards,id) => {
    for (let board of boards) {
        for (let column of board.columns) {
            for (let task of column.tasks) {
                if (task.id === id) {
                    return task
                }
            }
        }
    }

    return null
}

export { getTask } 

//Get subtask array
export function getSubtaskArr (boards,subtaskId) {
    for (let board of boards) {
        for (let column of board.columns) {
            for (let task of column.tasks) {
                for(let subtask of task.subtasks){
                    if (subtask.id === subtaskId) {
                        return task.subtasks
                    }
                }
            }
        }
    }
    return null
}

//Get subtask by Id
export function getSubtask (boards,subtaskId) {
    for (let board of boards) {
        for (let column of board.columns) {
            for (let task of column.tasks) {
                for(let subtask of task.subtasks){
                    if (subtask.id === subtaskId) {
                        return subtask
                    }
                }
            }
        }
    }
    return null
}  
//Get status
const getStatus = (boards,id) => {
    for (let board of boards) {
        for (let column of board.columns) {
            for (let task of column.tasks) {
                if (task.id === id) {
                    return column.name 
                }
            }
        }
    }
    return null
}

export {getStatus}