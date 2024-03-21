import React from 'react'; // Dodaj ten import
import TodoForm from './TodoForm'
// import EditTodoForm from './EditTodoForm'
import Todo from './Todo'
import { useState, useEffect } from 'react' // Dodajemy useEffect
import { v4 as uuidv4 } from 'uuid'

const TodoWrapper = () => {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    const initialTasks = [
      { id: uuidv4(), desc: "Wstań z łóżka", completed: false, isDaily: true, category: "Home" },
      { id: uuidv4(), desc: "Idź się umyć", completed: false, isDaily: false, category: "Home" },
      { id: uuidv4(), desc: "Wyjdź z domu", completed: false, isDaily: true, category: "Outside" }
    ]

    setTodos(initialTasks)
  }, []) 

  function addTodo(todo) {
    setTodos([...todos, {
      id: uuidv4(),
      desc: todo.value,
      completed: false,
      isEditing: false, 
      isDaily: todo.isDaily,  // isDaily na wartosc z checkboxa,
      category: todo.category,
    }]);
  }
  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }
  function handleEdit(id, newDesc) {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, desc: newDesc } : todo));
  }
  
  function toggleComplete (id) {
    setTodos(todos.map(todo => todo.id === id ? {
      ...todo, completed: !todo.completed} : todo))
  }

  return (
    <div className="container shadow p-5" >
      <div className="row">
      <TodoForm addTodo={addTodo} />
        <div className="col">
        <p className="py-4 text-xl font-bold underline">Zadania do wykonania:</p>

          {todos.map((desc,index) => (
            <Todo 
              task={desc} 
              key={index} 
              toggleComplete={toggleComplete} 
              removeTodo={removeTodo} 
              handleEdit={handleEdit}
            />
          ))}
    
        </div>

        
      </div>
    </div>
  )
}

export default TodoWrapper
