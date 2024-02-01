import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import useFetch from "../hooks/useFetch"

const Sentbox = (props) => {
  const email = useSelector((state) => state.auth.email)
  const [mails, setMails] = useState([])
  console.log(mails)

  const { data, error } = useFetch({
    url: `https://mailbox-client-17386-default-rtdb.asia-southeast1.firebasedatabase.app/${
      email.split(".")[0]
    }/sentbox.json`,
  })

  useEffect(() => {
    if (error) {
      console.log(error)
      return
    }

    const keys = Object.keys(data)
    const mailItems = keys.map((item) => data[item])
    setMails(mailItems)
  }, [data, error])

  // const keys = Object.keys(data)
  // const mailItems = keys.map((item) => data[item])
  // useEffect(() => {
  //   setMails(mailItems)
  // }, [mailItems])
  // // console.log(a, "aaaaaaaaaaaa")
  // // const keys = Object.keys(data)
  // // const mailItems = keys.map((item) => data[item])
  // // useEffect(() => {
  // //   setMails(mailItems)
  // // }, [mailItems])
  // const getMails = async () => {
  //   const response = await fetch(
  //     `https://mailbox-client-17386-default-rtdb.asia-southeast1.firebasedatabase.app/${
  //       email.split(".")[0]
  //     }/sentbox.json`
  //   )
  //   if (!response.ok) throw new Error("Could not fetch mails")
  //   const data = await response.json()
  //   return data
  // }

  // useEffect(() => {
  //   // const { data, error } = useFetch({
  //   //   url: `https://mailbox-client-17386-default-rtdb.asia-southeast1.firebasedatabase.app/${
  //   //     email.split(".")[0]
  //   //   }/sentbox.json`,
  //   // })
  //   // // if (error) throw new Error("kk")
  //   // const mailItems = keys.map((item) => data[item])
  //   // setMails(mailItems)
  //   const fetchData = async () => {
  //     try {
  //       const data = (await getMails()) || {}
  //       const keys = Object.keys(data)
  //       const mailItems = keys.map((item) => data[item])

  //       setMails(mailItems)
  //       console.log(mailItems)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  //   fetchData()
  // }, [email])

  return (
    <div className=" bg-slate-300">
      <h1 className=" mb-6 pt-5">sentbox</h1>

      {mails.map((item) => (
        <div
          onClick={() => {
            props.setmaildetails(item)
            props.setHomeContent("showmail")
          }}
          className=" bg-slate-400 mb-1 w-[100%] p-4 py-0  flex"
        >
          {" "}
          <h1 className=" w-[50%] bg-slate-100 ">Email:{item.email}</h1>
          <h2 className=" w-[50%]">Subject:{item.subject}</h2>
        </div>
      ))}
    </div>
  )
}

export default Sentbox
