import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/todosSlice.tsx';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { ThunkDispatch } from '@reduxjs/toolkit';

const TodoForm = () => {
  const [value, setValue] = useState("");
  const [isDaily, setIsDaily] = useState(false);
  const [category, setCategory] = useState("notcategorized");
  const [completed, setCompleted] = useState(false);
  const dispatch = useDispatch<ThunkDispatch<any,any,any>>();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedValue = value.trim();
    console.log("Dane do przesłania:", {
      desc: trimmedValue,
      isDaily,
      category,
      completed: false, // Upewnij się, że completed jest ustawione na false
    }); 
    if (trimmedValue.length > 3) {
      dispatch(addTodo({
        desc: trimmedValue,
        isDaily,
        category,
        completed: false, 
      }));
      setValue("");
      setIsDaily(false);
      setCategory("notcategorized");
      setCompleted(false);
    }
  };
  
  

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <Form className="todoForm" onSubmit={handleSubmit}>
            <Form.Control
              type="text"
              className="todoInput"
              placeholder="Enter new Task..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Row className="mt-2">
              <Col xs={4} md={3}>
                <Form.Check
                  type="checkbox"
                  checked={isDaily}
                  onChange={(e) => setIsDaily(e.target.checked)}
                  label="isDaily"
                />
              </Col>
              <Col xs={8} md={9}>
                <Form.Select
                  aria-label="Select Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="notcategorized">Select Category</option>
                  <option value="Home">Home</option>
                  <option value="Outside">Outside</option>
                  <option value="Pets">Pets</option>
                </Form.Select>
              </Col>
              <Col xs={12} className="mt-2 d-flex justify-content-center">
                <Button type="submit" variant="primary" className="rounded-full px-4 py-2">
                  Add Task
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default TodoForm;
