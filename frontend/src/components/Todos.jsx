import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookie from 'js-cookie';

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    title: '',
    priority: 'low' 
  });
  const [editingTodo, setEditingTodo] = useState(null);
  const [editForm, setEditForm] = useState({
    title:'',
    priority:'low',
    status:'PENDING'
  })

  useEffect(() => {
    fetchTodos();
  }, []);

  const getAuthToken = () =>{
    return Cookie.get("Token");
  }

  const api = axios.create({
    baseURL : 'http://localhost:5000',
    headers : {
      'Authorization': `Bearer ${getAuthToken()}`
    }
    
  })

  const fetchTodos = async () => {
    try {
      const result = await api.get("/todos");
      setTodos(result.data.result);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const newTodoAdder = (e) => {
    const { name, value } = e.target;
    setNewTodo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/todos/create", newTodo);
      setNewTodo({ title: '', priority: 'low' });
      fetchTodos();
    } catch (error) {
      console.log("Error creating todo:", error);
    }
  };

  const startEditing =(todo)=>{
    setEditingTodo(todo._id);
    setEditForm({
      title: todo.title,
      priority:todo.priority,
      status:todo.status
    })
  }

  const handleEditChange = (e)=>{
    const {name,value} = e.target;
    setEditForm(prev =>({...prev, [name]: value}))
  }

  const handleUpdate = async (e) =>{
    e.preventDefault();
    try {
      let updatedTodo = await api.put(`/todos/${editingTodo}`, editForm);
      setTodos(todos.map(todo => 
        todo._id === editingTodo ? updatedTodo.data: todo
      ));
      setEditingTodo(null);
      //fetchTodos();
    } catch (error) {
      console.error('Error in updation', error);
    }
  }
  
  const handleDelete = async (todoId) =>{
    try {
      await api.delete(`/todos/${todoId}`);
      setTodos(todos.filter(todo => todo._id !== todoId))
      //fetchTodos();
      alert('Todo deleted Successfully');
    } catch (error) {
      console.error('Delete Error', error)
      alert('failed to delete Todo')
    }
  }

  return (
    <div className="todos-container">
      <div className="todo-container">
        <div className="create-todo">
          <h3>Add New Todo</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              value={newTodo.title}
              onChange={newTodoAdder}
              placeholder="Enter todo title"
              required
            />
            <select
              name="priority"
              value={newTodo.priority}
              onChange={newTodoAdder}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <button type="submit">Add Todo</button>
          </form>
        </div>

        <div className="todo-list">
          <h3>My Todos</h3>
          
          {
          todos.length > 0 ? (
            <ul>
              {todos.map(todo => (
                <li key={todo._id} className={`todo-item ${todo.priority}`}>

                  {editingTodo === todo._id ? (
                    <form onSubmit={handleUpdate}>
                      <input
                        type="text"
                        name="title"
                        value={editForm.title}
                        onChange={handleEditChange}
                        required
                      />
                      <select
                        name="priority"
                        value={editForm.priority}
                        onChange={handleEditChange}
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                      <select
                        name="status"
                        value={editForm.status}
                        onChange={handleEditChange}
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="IN-PROGRESS">IN-PROGRESS</option>
                        <option value="COMPLETED">COMPLETED</option>
                      </select>
                      <button type="submit">Save</button>
                      <button type="button" onClick={() => setEditingTodo(null)}>
                        Cancel
                      </button>
                    </form>
                  ) : (
                    <>
                      <span>{todo.title}</span>
                      <span className="priority-badge">{todo.priority}</span>
                      <span className="status">{todo.status}</span>
                      <button onClick={() => startEditing(todo)}>Edit</button>
                      <button onClick={() => handleDelete(todo._id)}>Delete</button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No todos found. Add one above!</p>
          )
          }
        </div>
      </div>
    </div>
  );
};

export default Todos;