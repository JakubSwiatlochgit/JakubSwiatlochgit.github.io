import React, { useState } from "react";

const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState("");
  const [isDaily, setIsDaily] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    addTodo({
      value,
      isDaily,
    });

    setValue("");
    setIsDaily(false);
  }

  return (
    <div className="container">
      <form className="todoForm " onSubmit={handleSubmit}>
        <div className="row  d-felx justify-content-center ">
          <div className="col-12 col-md-6">
            <input
              type="text"
              className="todoInput form-control"
              placeholder="Enter new Task..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <div className="col-12 mt-4">
            <label className="me-5">
              <span className="me-3">isDaily</span>
              <input
                type="checkbox"
                checked={isDaily}
                onChange={(e) => setIsDaily(e.target.checked)}
              />
            </label>
            <button type="submit" className="btn btn-primary">
              Add Task
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;