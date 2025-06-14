import React from "react";
import { useParams } from "react-router-dom";
import { useDataContext } from "../contexts/DataContext"
import slugify from "./slugify/slugify"

export default function FindBoard () {

    //Searches for the current board based on url slug
    //returns the current board, if not, return null

    const { data } = useDataContext()
    const boards = data.boards
    const boardName = useParams().boardName
    let toReturnBoard = {}
    boards.map((board,index) => {
        if(slugify(board.name) === boardName){
             toReturnBoard={
                board: board,
                index: index,
             }

        }
    })

    return toReturnBoard

}