import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/home'
import Search from './pages/search'
import Register from './pages/register'
import Login from './pages/login'
import Booking from './pages/booking'
import Manage from './pages/manage'
import Payment from './pages/payments'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/> } />
        <Route path="/search" element={<Search/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/booking/:id' element={<Booking/>}></Route>
        <Route path='/manage' element={<Manage/>}></Route>
        <Route path='/payment' element={<Payment/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
