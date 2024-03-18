import TodoForm from './TodoForm'
// import EditTodoForm from './EditTodoForm'
import Todo from './Todo'
import { useState, useEffect } from 'react' // Dodajemy useEffect
import { v4 as uuidv4 } from 'uuid'

const TodoWrapper = () => {
  const [todos, setTodos] = useState([
    
  ])
  const [daily, setDaily] = useState([])

  useEffect(() => {
    const initialTasks = [
      { id: uuidv4(), desc: "Wstań z łóżka", completed: false, isDaily: true },
      { id: uuidv4(), desc: "Idź się umyć", completed: false, isDaily: true },
      { id: uuidv4(), desc: "Wyjdź z domu", completed: false, isDaily: true }
    ]

    setTodos(initialTasks)
  }, []) 

  function addTodo(todo) {
    setTodos([...todos, {
      id: uuidv4(),
      desc: todo.value,
      completed: false,
      isEditing: false, 
      isDaily: todo.isDaily  // Ustawienie isDaily na wartość z checkboxa
    }]);
  }
  console.log(todos)
  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }
  
  function toggleComplete (id) {
    setTodos(todos.map(todo => todo.id === id ? {
      ...todo, completed: !todo.completed} : todo))
      console.log(todos)
  }

  return (
    <div className="container shadow p-5" >
      <div className="row">
      <TodoForm addTodo={addTodo} />
        <div className="col">
          <h1 className="py-4">Zadania do wykonania:</h1>
          {todos.map((desc,index) => (
            <Todo 
            task={desc} 
            key={index} 
            toggleComplete={toggleComplete} 
            removeTodo={removeTodo} 
          />
          ))}
    
        </div>

        
      </div>
    </div>
  )
}

export default TodoWrapper
