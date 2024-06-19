import React, { useState , useEffect} from 'react'
import "./Style.css";
import Todo from './Todo';
import axios from "axios";

const CreateTodo = () => {

    const[title, setTitle] = useState('');
    const[todo, setTodo] = useState("");
    const[todoList, setTodoList] = useState([])

    useEffect(() => {
      const fetchTodo = async () => {
        try {
          const response = await axios.get("http://localhost:3000/api/v1/todo/todos");
          console.log('Fetched Todos:', response.data.todos);
          setTodoList(response.data.todos);
        } catch (error) {
          console.error('Error fetching todos:', error);
        }
      };
      fetchTodo();
    }, []);


    const handleChange=(e)=>{
        setTodo(e.target.value);
        setTitle(e.target.value);
    }
    
    const handleDelete = async (todoId) => {
      try {
        console.log(`Deleting todo with ID: ${todoId}`);
        const response = await axios.delete(`http://localhost:3000/api/v1/todo/todos/${todoId}`);
        if (response.status === 200) {
          setTodoList(todoList.filter(todo => todo._id !== todoId));
        } else {
          console.error('Error deleting todo:', response);
        }
        console.log('After deletion', todoList);
      } catch (error) {
        console.error('Error deleting todo:', error);
      }
    };
  return (
    <div>
    <h1>ToDo</h1>
    <div className='create-todo'>
        <input type="text" placeholder='enter a todo' className='input' value={todo} onChange={handleChange}/>
        <button className='button'onClick={async () => {
            const response = await axios.post("http://localhost:3000/api/v1/todo/todos", {
              title
            })
            setTodoList([...todoList, response.data.todo]);
            setTodo('');
            }} 
            
            >Create</button>
      </div>
      <Todo list={todoList} onDelete={handleDelete}/>
    </div>
  )
}

export default CreateTodo
