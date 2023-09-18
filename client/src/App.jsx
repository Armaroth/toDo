import { Login } from "./components/Login"
import { Register } from './components/Register'
import './App.css'
import { Dashboard } from "./components/Dashboard"
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/login" element={<Login />} />



          <Route path="/register" element={<Register />} />



          <Route path="/" element={<Dashboard />} />




        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
