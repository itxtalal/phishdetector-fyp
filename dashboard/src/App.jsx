import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Analytics from './pages/Dashboard/Analytics'
import Profile from './pages/Profile'
import ManageSites from './pages/Form/ManageSites'
import Tables from './pages/Tables'
import Settings from './pages/Settings'
import Chart from './pages/Chart'
import SignIn from './pages/Authentication/SignIn'
import SignUp from './pages/Authentication/SignUp'

const App = () => {
  const [loading, setLoading] = useState(true)

  const preloader = document.getElementById('preloader')

  if(preloader) {
    setTimeout(() => {
      preloader.style.display = 'none'
      setLoading(false)
    }, 2000);
  }

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

  return (
    !loading && (
      <>
        <Routes>
          <Route exact path='/' element={<Chart />} />
          <Route path='/tables' element={<Tables />} />
          {/* <Route path='/settings' element={<Settings />} />
          <Route path='/chart' element={<Chart />} /> */}

          <Route path='/auth/signin' element={<SignIn />} />
          <Route path='/auth/signup' element={<SignUp />} />
        </Routes>
      </>
    )
  )
}

export default App
