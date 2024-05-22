// Kod dla komponentu TodoForm
import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { TodoFormProps } from './../Interfaces/Interfaces';

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [value, setValue] = useState("");
  const [isDaily, setIsDaily] = useState<boolean>(false);
  const [category, setCategory] = useState("notcategorized");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  const trimmedValueFromMoreSpaces = value.replace(/\s{2,}/g, ' ').trim();
  console.log(trimmedValueFromMoreSpaces); // Dodaj console.log tutaj

  if(trimmedValueFromMoreSpaces.trim().length > 3 && trimmedValueFromMoreSpaces.trim() !== ""){
    axios.post("http://localhost:3001/addTask", {
      desc: trimmedValueFromMoreSpaces,
      isDaily,
      category
    })
    .then(response => {
      console.log(response.data.desc);
      addTodo({
        _id: response.data._id,
        desc: trimmedValueFromMoreSpaces,
        completed: false,
        isDaily,
        category
      });
      setValue("");
      setIsDaily(false);
      setCategory("notcategorized");
    })
    .catch(error => {
      console.error("Błąd podczas dodawania zadania:", error);
    });
  } 
}


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
                  onChange={(e) => setCategory(e.target.value)}
                  name="category"
                >
                  <option value="">Select Category</option>
                  <option value="Home">Home</option>
                  <option value="Outside">Outside</option>
                  <option value="Pets">Pets</option>
                </Form.Select>
              </Col>
              <Col xs={3} md={12} className="mt-2 d-none d-md-block">
                <Button type="submit" variant="primary" className="rounded-full px-4 py-2">
                  Add Task
                </Button>
              </Col>
            </Row>
            <Row className="d-block d-md-none mt-2">
              <Col xs={12}>
                <Button type="submit" variant="primary" size="lg" className="rounded-full px-3 py-2">
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
