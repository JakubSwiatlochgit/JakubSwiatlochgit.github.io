import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodos, addTodo, deleteTodo, updateTodo } from '../redux/todosSlice';
import TodoForm from './TodoForm';
import Todo from './Todo';
import { Container, Row, Col } from 'react-bootstrap';
import { ThunkDispatch } from '@reduxjs/toolkit';

import Navbar from './Navbar';

const TodoWrapper = () => {
  const dispatch = useDispatch<ThunkDispatch<any,any,any>>();
  const todos = useSelector(state => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());  
  }, [dispatch]);

  const handleAddTodo = (newTodo) => {
    dispatch(addTodo(newTodo));
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleUpdateTodo = (id, newDesc) => {
    dispatch(updateTodo({ id, desc: newDesc }));
  };

  const handleToggleComplete = (id, completed) => {
    dispatch(updateTodo({ id, completed: !completed }));
    console.log("tutaj", id, completed)
  };

  return (
     <div>
        <Navbar />
        <Container fluid className="shadow p-5">  
          <Row>
            <Col>
              <TodoForm addTodo={handleAddTodo} />
              <p className="py-4 text-xl font-bold underline">Zadania do wykonania:</p>
              {todos.map((task) => (
                <Todo
                  key={task._id}
                  task={task}
                  toggleComplete={handleToggleComplete}
                  removeTodo={handleDeleteTodo}
                  handleEdit={handleUpdateTodo}
                />
              ))}
            </Col>
          </Row>
        </Container>
     </div>
  );
};

export default TodoWrapper;
