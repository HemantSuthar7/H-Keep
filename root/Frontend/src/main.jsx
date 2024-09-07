import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from "./store/Store.js"
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Protected } from "./components/index.js"
import ReactDOM from 'react-dom/client'
import React from 'react'
import Home from "./pages/Home.jsx"
import AddList from "./pages/AddList.jsx"
import AddNote from "./pages/AddNote.jsx"
import EditList from "./pages/EditList.jsx"
import EditNote from "./pages/EditNote.jsx"
import List from "./pages/List.jsx"
import Note from "./pages/Note.jsx"
import Login from "./pages/Login.jsx"
import Signup from './pages/Signup.jsx'
import UserNotesAndLists from "./pages/UserNotesAndLists.jsx"
import Label from './pages/Label.jsx'
import LabelDataViewer from './pages/LabelDataViewer.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children : [
      {
        path : "/Home",
        element : <Home/>
      },
      {
        path : "/",
        element : <Home/>
      },
      {
        path:"/login",
        element: (
        <Protected authentication={false}>
          <Login/>
        </Protected>
        )
      },
      {
        path: "/signup",
        element: (
          <Protected authentication={false}>
            <Signup/>
          </Protected>
          )
      },
      {
        path : "/AddList",
        element :( 
        <Protected authentication>
          <AddList/>
        </Protected>
        )
      },
      {
        path : "/AddNote",
        element :( 
        <Protected authentication>
          <AddNote/>
        </Protected>
        )
      },
      {
        path : "/EditList",
        element :( 
        <Protected authentication>
          <EditList/>
        </Protected>
        )
      },
      {
        path : "/EditNote",
        element :( 
        <Protected authentication>
          <EditNote/>
        </Protected>
        )
      },
      {
        path : "/List",
        element :( 
        <Protected authentication>
          <List/>
        </Protected>
        )
      },
      {
        path : "/Note",
        element :( 
        <Protected authentication>
          <Note/>
        </Protected>
        )
      },
      {
        path : "/UserNotesAndLists",
        element :( 
        <Protected authentication>
          <UserNotesAndLists/>
        </Protected>
        )
      },
      {
        path : "/Label",
        element :( 
        <Protected authentication>
          <Label/>
        </Protected>
        )
      },
      {
        path : "/LabelDataViewer",
        element :( 
        <Protected authentication>
          <LabelDataViewer/>
        </Protected>
        )
      },
    ]
  }
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
