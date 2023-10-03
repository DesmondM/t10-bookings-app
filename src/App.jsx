import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Cabins from './pages/Cabins'
import Users from './pages/Users'
import Settings from './pages/Settings'
import Account from './pages/Account'
import Login from './pages/Login'
import PageNotFound from './pages/PageNotFound'

const App = () => {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="dashboard" element={<Dashboard/>} />
    <Route path="cabins" element={<Cabins/>} />
    <Route path="users" element={<Users/>} />
    <Route path="settings" element={<Settings/>} />
    <Route path="account" element={<Account/>} />
    <Route path="login" element={<Login/>} />
    <Route path="*" element={<PageNotFound/>} />
   </Routes>
   </BrowserRouter>
  )
}

export default App