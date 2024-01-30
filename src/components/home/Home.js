import React, { useState } from "react"
import Editor from "../Editor/Editor"
import { NavLink } from "react-router-dom"
import { useDispatch } from "react-redux"
import { authActions } from "../../store/authSlice"
import Mailbox from "./Mailbox"
import Sentbox from "./SentBox"

const Home = () => {
  const [homeContent, setHomeContent] = useState("mailbox")
  const dispatch = useDispatch()
  const logOutHandler = () => {
    dispatch(authActions.setLogIn(false))
    localStorage.setItem("user2", JSON.stringify({}))
  }
  return (
    <div className=" flex h-[100vh] ">
      <div className=" w-[20%] pt-6 bg-slate-500">
        <ul className=" ">
          <li
            onClick={() => {
              setHomeContent("compose")
            }}
            className={`cursor-pointer py-1 ${
              homeContent === "compose" ? "text-red-500" : ""
            }`}
          >
            Compose
          </li>
          <li
            onClick={() => {
              setHomeContent("mailbox")
            }}
            className={`cursor-pointer py-1 ${
              homeContent === "mailbox" ? "text-red-500" : ""
            }`}
          >
            Mailbox
          </li>
          <li
            onClick={() => {
              setHomeContent("sentbox")
            }}
            className={`cursor-pointer py-1 ${
              homeContent === "sentbox" ? "text-red-500" : ""
            }`}
          >
            Sentbox
          </li>
          <li onClick={logOutHandler}>
            <NavLink to="/signup">Logout</NavLink>
          </li>
        </ul>
      </div>
      <div className=" w-[80%] bg-red-200">
        {homeContent === "compose" ? <Editor></Editor> : ""}
        {homeContent === "mailbox" ? <Mailbox></Mailbox> : ""}
        {homeContent === "sentbox" ? <Sentbox></Sentbox> : ""}
      </div>
    </div>
  )
}

export default Home
