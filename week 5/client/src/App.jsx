import { useState } from 'react'
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import './App.css'
import Todo from './pages/Todo'
import Signup from './pages/Signup'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element=<Signup/>></Route>
        <Route path="/todo" element=<Todo/>></Route> 
      </Routes> 
      </BrowserRouter>
    </>
  )
}

export default App
