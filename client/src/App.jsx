import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import Users from './Users'
import CreateUsers from './CreateUsers'
import UpdateUsers from './UpdateUsers'
import Login from './Login'

function App() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Login />}></Route>
          <Route path='/users' element={<Users />}></Route>
          <Route path='/createUser' element={<CreateUsers />}></Route>
          <Route path='/update/:id' element={<UpdateUsers />}></Route>


        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
