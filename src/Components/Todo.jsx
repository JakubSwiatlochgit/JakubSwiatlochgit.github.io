import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

const Todo = ({ task, toggleComplete , removeTodo}) => {

  let checkLogic = `${task.completed ? 'completed' : ''} ${task.isDaily ? 'daily' : ''}`

  return (
    <div className="todo container shadow p-5">
      <div className="row">
        <div className="col-12 col-md-8">
          <h3
            onClick={() => toggleComplete(task.id, task.completed)} 
            className={`${checkLogic}`}
          >
            {task.desc}
            
          </h3>
        </div>
        <div className="col-12 col-md-4">
          <div className="icons ">
            <FontAwesomeIcon 
              icon={faPenToSquare} 
              className="mx-4"  
            />
            <FontAwesomeIcon icon={faTrash} onClick={
              () => removeTodo(task.id)}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo
