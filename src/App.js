import "./App.css"
import Editor from "./components/Editor/Editor"
import Home from "./components/home/Home"
import SignUp from "./components/authentication/SignUp"
import { useState } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const idToken = useSelector((state) => state.auth.isToken)

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? <Home></Home> : <Navigate to="/signup"></Navigate>
          }
        ></Route>
        <Route
          path="/signup"
          element={
            !isLoggedIn ? <SignUp></SignUp> : <Navigate to="/"></Navigate>
          }
        ></Route>
      </Routes>
    </div>
  )
}

export default App
