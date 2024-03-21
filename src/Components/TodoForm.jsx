import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState("");
  const [isDaily, setIsDaily] = useState(false);
  const [category, setCategory] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const trimmedValueFromMoreSpaces = value.replace(/\s{2,}/g, ' ').trim();

    if(trimmedValueFromMoreSpaces.trim().length > 3 && trimmedValueFromMoreSpaces.trim() !== ""){
      addTodo({
        value : trimmedValueFromMoreSpaces,
        isDaily,
        category
      });
  
      setValue("");
      setIsDaily(false);
    }
  }
  console.log(value.length)
  return (
    <div className="container">
      <form className="todoForm" onSubmit={handleSubmit}>
        <div className="row justify-content-center ">
          <div className="col-12 col-md-6">
            <input
              type="text"
              className="todoInput form-control"
              placeholder="Enter new Task..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>

          <div className="row mt-2">
            <div className="d-flex justify-content-between align-items-md-center">
              <div className="col-3">
                <input
                  type="checkbox"
                  checked={isDaily}
                  onChange={(e) => setIsDaily(e.target.checked)}
                />
                <span className="ms-3 me-5 ">isDaily</span>
              </div>
              <div className="col-6">
                <select
                  className="form-select"
                  aria-label="Select Category"
                  onChange={(e) => setCategory(e.target.value)}
                  name="category"
                >
                  <option value="">Select Category</option>
                  <option value="Home">Home</option>
                  <option value="Outside">Outside</option>
                  <option value="Pets">Pets</option>
                </select>
              </div>
              <div className="d-none d-md-block col-3 mt-2">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                  Add Task
                </button>
              </div>
            </div>
          </div>

          <div className="row d-block d-md-none col-12 mt-2">
            <div className="">
              <button type="submit" className="btn btn-primary px-5 py-2">
                Add Task
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
}
export default TodoForm;