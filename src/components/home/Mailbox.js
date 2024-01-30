import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const Mailbox = () => {
  const email = useSelector((state) => state.auth.email)
  const [mails, setMails] = useState([])
  console.log(mails)
  const getMails = async () => {
    const response = await fetch(
      `https://mailbox-client-17386-default-rtdb.asia-southeast1.firebasedatabase.app/${
        email.split(".")[0]
      }/mailbox.json`
    )
    if (!response.ok) throw new Error("Could not fetch mails")
    const data = await response.json()
    return data
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = (await getMails()) || {}
        const keys = Object.keys(data)
        const mailItems = keys.map((item) => data[item])

        setMails(mailItems)
        console.log(mailItems)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [email])

  return (
    <div className=" bg-slate-300">
      <h1 className=" mb-6 pt-5">mails</h1>

      {mails.map((item) => (
        <div className=" bg-slate-400 mb-1 w-[100%] p-4 py-0  flex">
          {" "}
          <h1 className=" w-[50%] bg-slate-100 ">Email:{item.email}</h1>
          <h2 className=" w-[50%]">Subject:{item.subject}</h2>
        </div>
      ))}
    </div>
  )
}

export default Mailbox
