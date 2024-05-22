import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TodoForm from './TodoForm';
import Todo from './Todo';
import axios from 'axios';
import { TodoItem } from './../Interfaces/Interfaces';
import { v4 as uuidv4 } from 'uuid'; // import uuid

const TodoWrapper = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3001/getTasks")
      .then(response => {
        setTodos(response.data);
        console.log("Pobrane zadania:", response.data);
      })
      .catch(error => {
        console.error("Błąd podczas pobierania zadań:", error);
      });
  }, []);
  

  function addTodo(todo: { value: string; isDaily: boolean; category: string }) {
    //manipulacja stanem lokalnym
  }
  
  function removeTodo(id: string) {
    console.log(id)
    axios.delete(`http://localhost:3001/deleteTask/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== id));
      })
      .catch(error => {
        console.error("Błąd podczas usuwania zadania:", error);
      });
  }
  
  function handleEdit(id: string, newDesc: string) {
    console.log(id)
    axios.put(`http://localhost:3001/updateTask/${id}`, { desc: newDesc }) 
    .then(() => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, desc: newDesc } : todo));
      })
      .catch(error => {
        console.error("Błąd podczas edycji zadania:", error);
      });
  }
  

  
  function toggleComplete(id: string) {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  }

  return (
  <Container fluid className="shadow p-5">
    <Row>
      <Col>
        <TodoForm addTodo={addTodo} />
        <p className="py-4 text-xl font-bold underline">Zadania do wykonania:</p>
        {todos.map((task) => (
          <Todo

            key={task._id}
            task={task}
            toggleComplete={toggleComplete}
            removeTodo={removeTodo}
            handleEdit={handleEdit}
          />
        ))}
      </Col>
    </Row>
  </Container>
);
};

export default TodoWrapper;
