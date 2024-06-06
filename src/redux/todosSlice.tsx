// src/features/todos/todosSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';


interface Todo {
  _id: string;
  desc: string;
  completed: boolean;
  isDaily: boolean;
  category: string;
}

type TodosState = Todo[];

export const fetchTodos = createAsyncThunk<Todo[]>('todos/fetchTodos', async () => {
  const response = await axios.get('http://localhost:3001/getTasks');
  return response.data;
});

export const addTodo = createAsyncThunk<Todo, Partial<Todo>>('todos/addTodo', async (newTodo) => {
  const todoToAdd = { ...newTodo, completed: false }; // Dodaj completed jako domyślną wartość
  const response = await axios.post('http://localhost:3001/addTask', todoToAdd);
  return response.data; // Zwróć pełną odpowiedź z serwera
});

export const deleteTodo = createAsyncThunk<string, string>('todos/deleteTodo', async (id) => {
  await axios.delete(`http://localhost:3001/deleteTask/${id}`);
  return id;
});

export const updateTodo = createAsyncThunk<Todo, { id: string; desc: string; completed?: boolean }>(
  'todos/updateTodo',
  async ({ id, desc, completed }) => {
    const response = await axios.put(`http://localhost:3001/updateTask/${id}`, { desc, completed });
    return response.data;
  }
);

const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as TodosState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        return action.payload;
      })
      .addCase(addTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.push(action.payload);
      })
      .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<string>) => {
        return state.filter(todo => todo._id !== action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        const index = state.findIndex(todo => todo._id === action.payload._id);
        if (index !== -1) {
          state[index] = action.payload;
        }
      })

      
  },
});

export default todosSlice.reducer;
