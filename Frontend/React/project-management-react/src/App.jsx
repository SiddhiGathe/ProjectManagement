import Home from '@/Pages/Home/Home'
import './App.css'
import Navbar from './Pages/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import ProjectDetails from './Pages/ProjectDetails/ProjectDetails'
import IssueDetails from './Pages/IssueDetails/IssueDetails'
import Subscription from './Pages/Subscription/Subscription'
import Auth from './Pages/Auth/Auth'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
//import { useState} from 'react'
import { getUser } from './Redux/Auth/Action'
import { store } from './Redux/store'
import { fetchProjects } from './Redux/Project/Action'
import UpgradeSuccess from './Pages/Subscription/UpgradeSuccess'
import AcceptInvitation from './Pages/Project/AcceptInvitation'



function App() {
  const dispatch=useDispatch();
  const {auth}=useSelector(store=>store);
  useEffect(()=>{
    dispatch(getUser())
    dispatch(fetchProjects({}))
  },[auth.jwt])

  console.log(auth)

  return (
    <>
    
    {
      auth.user? <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/project/:id" element={<ProjectDetails/>}/>
        <Route path="/project/:projectId/issue/:issueId" element={<IssueDetails/>}/>
        <Route path="/upgrade_plan" element={<Subscription/>}/>
        <Route path="/upgrade/success" element={<UpgradeSuccess/>}/>
        <Route path="/accept_invitation" element={<AcceptInvitation/>}/>
      </Routes>
      </div>:<Auth/>
    }
    </>
  )
}

export default App
