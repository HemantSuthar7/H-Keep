import { useState, useEffect } from 'react'
import { Outlet } from "react-router-dom"
import Header from "./components/Header/Header.jsx"
import Footer from "./components/Footer/Footer.jsx"
import { useDispatch } from 'react-redux'
import {login, logout} from "./store/authSlice"
import {getCurrentUser} from "./methods/userMethods.js"

function App() {
  const [loading, setLoading] = useState(true) 
  const dispatch = useDispatch();

  useEffect(async () => {
    const userData = await getCurrentUser();
      if(userData){
        dispatch(login(userData))
      }else{
        dispatch(logout())
      }
      setLoading(false);
    });
  

  return !loading ? (
    <div className="min-h-screen flex flex-col bg-zinc-900 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-neutral-900 scrollbar-track-neutral-600 h-32 overflow-y-scroll">
      <div className='w-full block text-white'>
        <Header/>
        <main className="flex-grow">
        <Outlet />
        </main>
        <Footer/>
      </div>
    </div>
  ) : null
}

export default App
