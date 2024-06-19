import React, { useCallback, useState } from 'react'
import './Style.css';

const Todo = ({list, onDelete}) => {

    const handleDelete=(index)=>{
        onDelete(index);
    }

  return (
    <div>
     <div className='todo-list'>
      <div className='list'>
      <ol>
        {list.map((item, index)=>(
            <div className='item'>
            <li key={index} className='item'>{index+1}.{item}</li>
            <button className='button' onClick={()=>{handleDelete(index)}}>Delete</button>
            </div>
        ))}
    </ol>
      </div>
      </div>
    </div>
  )
}

export default Todo
