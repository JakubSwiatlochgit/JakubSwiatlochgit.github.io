import { useState } from 'react';
import PropTypes from 'prop-types';

const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState("");
  const [isDaily, setIsDaily] = useState(false);
  const [category, setCategory] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    addTodo({
      value,
      isDaily,
      category
    });

    setValue("");
    setIsDaily(false);
  }

  return (
    <div className="container">
      <form className="todoForm" onSubmit={handleSubmit}>
        <div className="row justify-content-center">
          <div className="col-6">
            <input
              type="text"
              className="todoInput form-control"
              placeholder="Enter new Task..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <div className="row">
            <div className="d-flex align-items-center">
              <div className="col-4">
                <input
                  type="checkbox"
                  checked={isDaily}
                  onChange={(e) => setIsDaily(e.target.checked)}
                />
                <span className="ms-3 me-5">isDaily</span>
              </div>
              <div className="col-4">
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
              <div className="col-4">
                <button type="submit" className="btn btn-primary">
                  Add Task
                </button>
              </div>
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