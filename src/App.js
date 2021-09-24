import React, { useState, useEffect, useContext } from 'react'
import './App.css'
import Template from './components/templates/template'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import Certificate from './components/certificates/certificate.js'
import { BrowserRouter as Router, Switch, Route, Link, useLocation } from "react-router-dom"
import { themeChange } from "theme-change"
import Context from './store/context'
import { signIn } from './store'
import { setLoading } from './store'
import Navbar from './components/Navbar'
import TemplateCanvas from './components/templateCanvas'
import CreateCertificate from './components/certificates/createCertificate'

import './css/style.scss';
import AOS from 'aos';
import { focusHandling } from 'cruip-js-toolkit';
import Home from './pages/home/Home';
import SignIn from './pages/home/SignIn';
import SignUp from './pages/home/SignUp';
import ResetPassword from './pages/home/ResetPassword';
import Dashboard from './pages/admin/Dashboard'
function App() {
  const { store, dispatch } = useContext(Context)
  const auth = getAuth()
  const [user, setUser] = useState(store.user || null)
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 700,
      easing: 'ease-out-cubic',
    });
  });

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
    focusHandling('outline');
  }, [location.pathname]); // triggered on route change

  useEffect(() => {
    themeChange(false)
    dispatch(setLoading(true))
    console.log(store.app)
  }, [])

  useEffect(() => {
    onAuthStateChanged(auth, (user_obj) => {
      if (user_obj) {
        setUser(user_obj)
      } else {
        console.log("No user")
      }
    })
  })

  useEffect(() => {
    dispatch(signIn(user))
    console.log("UserId from App.js", user.uid)
  }, [user])

  return (
    <>
      <Switch>
        {!store.user.uid && <Home />}
        <>
          {/* {!store.templates.currentTemplate.id && !store.app.isInHomePage && <Navbar />} */}
          {store.user.uid ?
            <>
              <Route exact path="/">
                <Dashboard />
              </Route>
              <Route path='/signin' exact>
                <SignIn />
              </Route>
              <Route path='/template/:templateId' exact>
                <TemplateCanvas />
              </Route>
              <Route path='/templates' exact>
                <Navbar />
                <Template />
              </Route>
              <Route path='/certificates' exact>
                <Navbar />
                <Certificate />
              </Route>
              <Route exact path='/certificate/create/:name'>
                <Navbar />
                <CreateCertificate />
              </Route>
              <Route path="/signup">
                <SignUp />
              </Route>
              <Route path="/reset-password">
                <ResetPassword />
              </Route>
              <Route path="/admin">
                <Dashboard />
              </Route>
              <Route path="/home">
                <Home />
              </Route>

            </> : <div />
          }
        </>
      </Switch>
    </>
  )
}

export default App
