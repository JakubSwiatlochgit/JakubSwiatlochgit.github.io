import {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

const Todo = ({ task, toggleComplete, removeTodo, handleEdit }) => {

  const [showEdit, setShowEdit] = useState(false)
  const [newDesc, setNewDesc] = useState(task.desc);

  let checkLogic = `${task.completed ? "completed" : ""} ${
    task.isDaily ? "daily" : ""
  }`;
  let containerClass = task.isDaily
    ? "todo container shadow p-5 isDaily"
    : "todo container shadow p-5";
   
  function showEditFormHandler() {
    setShowEdit(!showEdit)
    console.log(showEdit)
  }
  

  return (
    <div className={containerClass}>
      <div className="row">
        <div className="col-12 col-md-6 text-center">
          <h3
            onClick={() => toggleComplete(task.id, task.completed)}
            className={`${checkLogic}`}
          >
            <p className="mb-0">Task:</p>
            
            <p className="lead fw-bold">{task.desc}</p>
           
            <p className="mt-2 mb-0">Category:</p>
            
            <p className="lead fw-bold">{task.category}</p>
          </h3>
          
        </div>
        {
          showEdit && (
            <div className="container col-12 col-md-6 d-flex align-items-center flex-column justify-content-center text-center">
              <div className="row">
                <div className="inputEdit">
                  <input
                    type="text"
                    className="form-control"
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                  />
                  <button
                  className="btn btn-success mt-3"
                  onClick={() => {
                    handleEdit(task.id, newDesc);
                    setShowEdit(false);
                  }}> Apply </button>
                </div>
              </div>
            </div>
          )
        }
        <div className="col-12 mt-4 text-center d-flex justify-content-center align-items-center">
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
        </div>
      </div>
    </div>
  );
};

export default Todo;
