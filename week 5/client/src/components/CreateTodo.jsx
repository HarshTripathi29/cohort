import React, { useState } from 'react'
import "./Style.css";
import Todo from './Todo';

const CreateTodo = () => {


    const[todo, setTodo] = useState("");
    const[todoList, setTodoList] = useState([])

    const handleChange=(e)=>{
        setTodo(e.target.value);
    }

    const handleClick=()=>{
        setTodoList([...todoList, todo])
        console.log(todoList);
        setTodo("");
    }

    
    const handleDelete=(index)=>{
        setTodoList(todoList.filter((_,i)=>i!=index))
        console.log("after deletion", todoList);
    }

  return (
    <div>
    <h1>ToDo</h1>
    <div className='create-todo'>
        <input type="text" placeholder='enter a todo' className='input' value={todo} onChange={handleChange}/>
        <button className='button' onClick={handleClick}>Create</button>
      </div>
      <Todo list={todoList} onDelete={handleDelete}/>
    </div>
  )
}

export default CreateTodo
