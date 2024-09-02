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

  useEffect(() => {
    async function fetchData() {
      // Check if the access token exists before making the API call
      const accessToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('accessToken='))
        ?.split('=')[1];

      if (accessToken) {
        // If the token exists, try to fetch the current user data
        const userData = await getCurrentUser();
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      } else {
        // No token exists, treat the user as logged out
        dispatch(logout());
      }

      setLoading(false);
    }

    fetchData();
  }, [dispatch]);
  

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
