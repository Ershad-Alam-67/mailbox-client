import "./App.css"
import Editor from "./components/Editor/Editor"

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
        <Editor></Editor>
      )}
    </div>
  )
}

export default App
