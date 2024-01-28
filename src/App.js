import logo from "./logo.svg"
import "./App.css"
import SignUp from "./components/authentication/SignUp"
import { useState } from "react"
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [idToken, setIdToken] = useState()
  return (
    <div className="App">
      {!isLoggedIn ? (
        <SignUp setLogIn={setIsLoggedIn} setId={setIdToken}></SignUp>
      ) : (
        <div>welcome</div>
      )}
    </div>
  )
}

export default App
