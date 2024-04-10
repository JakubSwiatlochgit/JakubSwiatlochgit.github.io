import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Container, Row, Col } from 'react-bootstrap';
import TodoForm from './TodoForm';
import Todo from './Todo';
import { TodoItem } from './../Interfaces/Interfaces';

const TodoWrapper = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  useEffect(() => {
    const initialTasks: TodoItem[] = [
      { id: uuidv4(), desc: "Wstań z łóżka", completed: false, isDaily: true, category: "Home" },
      { id: uuidv4(), desc: "Idź się umyć", completed: false, isDaily: false, category: "Home" },
      { id: uuidv4(), desc: "Wyjdź z domu", completed: false, isDaily: true, category: "Outside" }
    ];

    setTodos(initialTasks);
  }, []);

  function addTodo(todo: { value: string; isDaily: boolean; category: string }) {
    setTodos([...todos, {
      id: uuidv4(),
      desc: todo.value,
      completed: false,
      isDaily: todo.isDaily,
      category: todo.category,
    }]);
  }
  
  function removeTodo(id: string) {
    setTodos(todos.filter(todo => todo.id !== id));
  }
  
  function handleEdit(id: string, newDesc: string) {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, desc: newDesc } : todo));
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
          {todos.map((task, index) => (
            <Todo 
              task={task} 
              key={index} 
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
