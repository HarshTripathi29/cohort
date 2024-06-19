import React, { useState, useEffect } from 'react';
import './Style.css';
import axios from 'axios';

const Todo = ({list, onDelete }) => {

  const handleDelete = (index) => {
    onDelete(index);
  }

  


  return (
    <div>
      <div className='todo-list'>
        <div className='list'>
          <ol>
            {list && list.map((item, index) => (
              <div className='item' key={index}>
                <li className='item'>{index + 1}. {item.title}</li>
                <button className='button' onClick={() => handleDelete(index)}>Delete</button>
              </div>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default Todo;
