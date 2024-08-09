import { useState } from 'react'
import { Outlet } from "react-router-dom"
import Header from "./components/Header/Header.jsx"
import Footer from "./components/Footer/Footer.jsx"

function App() {
  const [loading, setLoading] = useState(true) // 🚫❌🚫❌ implement this later

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
