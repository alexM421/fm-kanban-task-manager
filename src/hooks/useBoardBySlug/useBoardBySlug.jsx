import React from "react";
import { useParams } from "react-router-dom";
import { nanoid } from "nanoid";
//contexts
import { useDataContext } from "../../contexts/DataContext";
//utils
import { slugify } from "../../utils/utils";

export default function useBoardBySlug () {
    const { boardSlug } = useParams()
    const { data } = useDataContext()
    const boardData = boardSlug? data.boards.find(board => slugify(board.name) === boardSlug):null
    return boardData
}