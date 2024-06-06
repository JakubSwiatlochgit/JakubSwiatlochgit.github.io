import { createBrowserRouter } from "react-router-dom";
import React from "react";

import Contact from './Components/Contact.tsx'
import App from './App.tsx'
import TodoWrapper from './Components/TodoWrapper.tsx'

export const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/dashboard", element: <TodoWrapper /> },
  { path: "/contact", element: <Contact /> },
], {
  basename: '/todoList-Iwai'
})
