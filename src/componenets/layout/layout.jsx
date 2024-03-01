import React, { useEffect, useState } from 'react'
import Home from '../pages/home/home'
import './layout.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { auth, onAuthStateChanged } from '../../firebaseConfig/firebase'
import Signup from '../pages/auth/signup'
import Login from '../pages/auth/login'
import loaderImg from '../../loader/loader.gif'
export default function Layout() {
  const [user, setUser] = useState(false)
  const [loader, setLoader] = useState(true)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // const uid = user.uid;
        // console.log(uid);
        setUser(true)
        setLoader(false)
      } else {
        console.log('user not login');
        setUser(false)
        setLoader(false)
      }
    });
  }, [])
  return (
    <div>
      {
        loader ? <div className='layout-loader'><img src={loaderImg} alt="" /></div> :
          <div>
            <BrowserRouter basename='/React-EMS'>
              <Routes>
                <Route path='/React-EMS' element={user ? <Home /> :  <Navigate to={'/login'}/>} />
                <Route path='/home' element={user ? <Home /> :  <Navigate to={'/login'}/>} />
                <Route path='/signup' element={user ? <Navigate to={'/home'}/> : <Signup />} />
                <Route path='/login' element={user ? <Navigate to={'/home'}/> : <Login />} />
              </Routes>
            </BrowserRouter>
          </div>
      }
    </div>
  )
}
