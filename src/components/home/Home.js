import React, { useState } from "react"
import Editor from "../Editor/Editor"
import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { authActions } from "../../store/authSlice"
import Mailbox from "./Mailbox"
import Sentbox from "./SentBox"
import ShowMail from "./ShowMail"

const Home = () => {
  const [homeContent, setHomeContent] = useState("mailbox")
  const [maildetails, setmaildetails] = useState({})
  const totalUnread = useSelector((state) => state.mail.totalUnread)
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
            className={`cursor-pointer py-1 relative  ${
              homeContent === "mailbox" ? "text-red-500" : ""
            }`}
          >
            Mailbox{" "}
            {homeContent === "mailbox" && (
              <p className=" absolute right-6  inline-block ">{totalUnread}</p>
            )}
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
        {homeContent === "mailbox" ? (
          <Mailbox
            setHomeContent={setHomeContent}
            setmaildetails={setmaildetails}
          ></Mailbox>
        ) : (
          ""
        )}
        {homeContent === "sentbox" ? (
          <Sentbox
            setHomeContent={setHomeContent}
            setmaildetails={setmaildetails}
          ></Sentbox>
        ) : (
          ""
        )}
        {homeContent === "showmail" ? (
          <ShowMail
            message={maildetails.message}
            email={maildetails.email}
            subject={maildetails.subject}
          ></ShowMail>
        ) : (
          ""
        )}
      </div>
    </div>
  )
}

export default Home
