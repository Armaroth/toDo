import { Login } from "./pages/Login"
import { Register } from './pages/Register'
import { Dashboard } from "./pages/Dashboard"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useContext } from "react"
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
