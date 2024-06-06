import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import store from './redux/store.tsx';
import {Provider} from "react-redux"
import { RouterProvider} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import {router} from './router.tsx'




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>,
)
