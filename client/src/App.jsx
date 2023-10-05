import { Login } from "./components/Login"
import { Register } from './components/Register'
import './App.css'
import { Dashboard } from "./components/Dashboard"
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { useContext, useEffect } from "react"
import { UserContext } from "./context/userContext"


function App() {


  const { token } = useContext(UserContext);

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/login" element={!token ? <Login /> : <Dashboard />} />



          <Route path="/register" element={!token ? <Register /> : <Dashboard />} />



          <Route path="/" element={token ? <Dashboard /> : <Login />} />




        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
