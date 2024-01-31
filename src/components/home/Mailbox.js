import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { json } from "react-router-dom"
import { mailActions } from "../../store/mailsSlice"
const Mailbox = (props) => {
  const email = useSelector((state) => state.auth.email)
  const [mails, setMails] = useState([])
  const [totalUnread, setTotalUnread] = useState(0)
  const dispatch = useDispatch()

  console.log(mails)
  const setIsReadTrue = (mail) => {
    const response = fetch(
      `https://mailbox-client-17386-default-rtdb.asia-southeast1.firebasedatabase.app/${
        email.split(".")[0]
      }/mailbox/${mail.id}.json`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...mail, isRead: true }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong!")
        }
        return response.json()
      })
      .then((data) => {
        console.log(data)
      })
      .catch((e) => {
        console.log(e)
      })
  }
  useEffect(() => {
    const total = mails.reduce((total, item) => {
      if (item.isRead === false) {
        return total + 1
      }
      return total
    }, 0)
    //console.log(total)
    dispatch(mailActions.setTotalUnread(total))
    //setTotalUnread(total)
  }, [mails])
  const getMails = async () => {
    const response = await fetch(
      `https://mailbox-client-17386-default-rtdb.asia-southeast1.firebasedatabase.app/${
        email.split(".")[0]
      }/mailbox.json`
    )
    console.log(response)
    if (!response.ok) throw new Error("Could not fetch mails")
    const data = await response.json()
    console.log(data)
    return data
  }
  console.log(mails, "mmm")
  useEffect(() => {
    const fetchData = async () => {
      try {
        //console.log("fetch called")
        const data = (await getMails()) || {}
        const keys = Object.keys(data)
        const mailItems = keys.map((item) => {
          return { ...data[item], id: item }
        })

        setMails(mailItems)
        //console.log(mailItems)
      } catch (error) {
        // console.log("error")
        console.log(error)
      }
    }
    fetchData()
  }, [email])

  return (
    <div className=" bg-slate-300">
      <h1 className=" mb-6 pt-5">mails</h1>

      {mails.map((item) => (
        <div
          onClick={() => {
            setIsReadTrue(item)
            props.setmaildetails(item)
            props.setHomeContent("showmail")
          }}
          className=" bg-slate-400 mb-1 w-[100%] p-4 py-0  flex"
        >
          {" "}
          <h1 className=" w-[10%]">{item.isRead ? " read" : "unread"}</h1>
          <h1 className=" w-[45%] bg-slate-100 ">Email:{item.email}</h1>
          <h2 className=" w-[45%]">Subject:{item.subject}</h2>
        </div>
      ))}
    </div>
  )
}

export default Mailbox
