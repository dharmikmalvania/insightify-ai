import React from 'react'
import {Route, createBrowserRouter,createRoutesFromElements,RouterProvider } from 'react-router-dom'
import Homepage from './pages/Homepage';
import MainLayout from './layouts/MainLayout'
import JobsPages from './pages/JobsPages'

const router = createBrowserRouter(
  createRoutesFromElements(
  <Route path='/' element={<MainLayout />}>
  <Route index element={ <Homepage/>} />
  <Route path='/jobs' element={<Jobspage />} />
   
  </Route>
  )

);

const App = () => {
  return <RouterProvider router={router} /> 
}

export default App
