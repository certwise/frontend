import React, { useState, useEffect, useContext } from 'react'
import './App.css'
import SignIn from './components/auth'
import Template from './components/templates/template'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import Certificate from './components/certificates/certificate.js'
import { BrowserRouter as Router, Switch, Route, Link, } from "react-router-dom"
import { themeChange } from "theme-change"
import Context from './store/context'
import { signIn } from './store'
import { setLoading } from './store'
import Navbar from './components/Navbar'
function App() {
  const { store, dispatch } = useContext(Context)
  const auth = getAuth()
  const [user, setUser] = useState(store.user || null)

  useEffect(() => {
    themeChange(false)
    dispatch(setLoading(true))
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
      <Router>
        <Switch>
          <>
            {!store.templates.currentTemplate.id && <Navbar />}
            {store.user.uid ?
              <>
                <Route path='/signin' exact>
                  <SignIn />
                </Route>
                <Route path='/templates' exact>
                  <Template />
                </Route>
                <Route path='/certificates' exact>
                  <Certificate />
                </Route>
                <Route path='/templates/:id' exact>
                  <Template />
                </Route>
              </> : <SignIn />
            }
          </>
        </Switch>
      </Router>
    </>
  )
}

export default App
