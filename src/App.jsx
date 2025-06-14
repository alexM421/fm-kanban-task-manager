import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'

import HomeLayout from './layouts/HomeLayout/HomeLayout'
import Board from './layouts/Board/Board'


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout/>}>
        <Route path=":boardName" element={<Board/>}/>
      </Route>
    </Routes>
  )
}

export default App
