import React from "react";
import Data from "../../data.json"
import { nanoid } from 'nanoid'

const DataContext = React.createContext()

export function DataProvider ({ children }) {
    
     const initializeDataWithIds = (data) => {
        return {
            ...data,
            boards: data.boards.map(board => ({
                ...board,
                id: nanoid(),
                columns: board.columns.map(column => ({
                    ...column,
                    id: nanoid(),
                    tasks: column.tasks.map(task => ({
                        ...task,
                        id: nanoid(),
                        subtasks: task.subtasks.map(subtask => ({
                            ...subtask,
                            id: nanoid()
                        }))
                    }))
                }))
            }))
        }
    }

    // Initialize state with IDs already generated

    const [data, setData] = React.useState(() => initializeDataWithIds(Data))
    
    const value = {
        data: data,
        setData: setData
    }

    return(
        <DataContext.Provider value={value}>
            { children}
        </DataContext.Provider>
    )
}

export function useDataContext () {

    const context = React.useContext(DataContext)

    if(!context){
        throw new Error("DataContext is undefined.")
    }

    return context
}