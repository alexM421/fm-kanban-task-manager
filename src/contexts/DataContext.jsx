import React from "react";
import Data from "../../data.json"

const DataContext = React.createContext()

export function DataProvider ({ children }) {

    const [data, setData] = React.useState(Data)

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