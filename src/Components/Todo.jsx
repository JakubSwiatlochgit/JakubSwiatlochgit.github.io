import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { Button, Container, Row, Col } from 'react-bootstrap';

const Todo = ({ task, toggleComplete, removeTodo, handleEdit }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [newDesc, setNewDesc] = useState(task.desc);

  let checkLogic = `${task.completed ? "completed" : ""} ${
    task.isDaily ? "daily" : ""
  }`;
  let containerClass = task.isDaily
    ? "todo container shadow p-5 isDaily"
    : "todo container shadow p-5";

  function showEditFormHandler() {
    setShowEdit(!showEdit);
    console.log(showEdit);
  }

  return (
    <Container className={containerClass}>
      <Row>
        <Col xs={12} md={6} className="text-center text-break">
          <h3
            onClick={() => toggleComplete(task.id, task.completed)}
            className={`${checkLogic}`}
          >
            <p className="mb-0 lead fw-bold">Task:</p>

            <p className="">{task.desc}</p>

            <p className="mt-2 mb-0 lead fw-bold">Category:</p>

            <p className="">{task.category}</p>
          </h3>
        </Col>
        {showEdit && (
          <Col sm={12} md={6} className="d-flex align-items-center flex-column justify-content-center text-center mt-md-0 mt-3">
            <Row>
              <div className="inputEdit">
                <input
                  type="text"
                  className="form-control"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                />
                <Button
                  type="submit"
                  variant="green" 
                  className="rounded-full px-4 py-2 mt-3"
                  onClick={() => {
                    handleEdit(task.id, newDesc);
                    setShowEdit(false);
                  }}
                >
                  Apply
                </Button>
              </div>
            </Row>
          </Col>
        )}
        <Col sm={12} className="mt-4 text-center d-flex justify-content-center align-items-center">
          <div className="icons">
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="icon icon-Edit"
              onClick={() => showEditFormHandler(task.id)}
            />
            <span className="mx-4"></span>
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => removeTodo(task.id)}
              className="icon icon-Trash"
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

Todo.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    isDaily: PropTypes.bool.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
  toggleComplete: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
};

export default Todo;
