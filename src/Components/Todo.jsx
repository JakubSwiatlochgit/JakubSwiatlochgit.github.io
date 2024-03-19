import {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

const Todo = ({ task, category, toggleComplete, removeTodo, handleEdit }) => {

  const [showEdit, setShowEdit] = useState(false)
  const [newDesc, setNewDesc] = useState('');

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
        <div className="col-12 col-md-8 d-flex align-items-center">
          <h3
            onClick={() => toggleComplete(task.id, task.completed)}
            className={`${checkLogic}`}
          >
            <p className="mb-0">Task:</p>
            {task.desc}
           
            <p className="mt-2 mb-0">Category:</p>
            {task.category}
          </h3>
          
        </div>
        {
          showEdit && (
            <div className="inputEdit">
              <input 
                type="text" 
                value={newDesc} 
                onChange={(e) => setNewDesc(e.target.value)} 
              />
              <button onClick={() => {
                handleEdit(task.id, newDesc);
                setShowEdit(false);
              }}> Apply </button>
            </div>
          )
        }
        <div className="col-12 col-md-4 d-flex justify-content-center align-items-center">
          <div className="icons ">
            <FontAwesomeIcon 
              icon={faPenToSquare} 
              className="mx-4 icon icon-Edit"
              onClick={() => showEditFormHandler(task.id)} 
            />
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
