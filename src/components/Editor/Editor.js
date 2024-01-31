import { logDOM } from "@testing-library/react"
import React, { useState, useEffect } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { useSelector } from "react-redux"

const Editor = () => {
  const [value, setValue] = useState("")
  const [id, setId] = useState("")
  const [myId, setMyId] = useState("")
  const myEmail = useSelector((state) => state.auth.email)
  const [mailDetails, setMailDetails] = useState({
    email: "",
    subject: "",
    message: value,
    isRead: false,
  })
  console.log(typeof myEmail)
  useEffect(() => {
    setMyId(() => {
      return myEmail.split(".")[0]
    })
  }, [myEmail])
  useEffect(() => {
    setId(() => {
      return mailDetails.email.split(".")[0]
    })
    console.log(id)
  }, [mailDetails.email])
  console.log(id)
  const handleInputs = (obj) => {
    setMailDetails((prev) => {
      return { ...prev, ...obj }
    })
  }
  useEffect(() => {
    setMailDetails((prev) => {
      return { ...prev, message: value }
    })
  }, [value])
  const sendText = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(
        `https://mailbox-client-17386-default-rtdb.asia-southeast1.firebasedatabase.app/${id}/mailbox.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...mailDetails, email: myEmail }),
        }
      )

      if (response.ok) {
        console.log("Email sent successfully")
        setValue("")
        setMailDetails({
          email: "",
          subject: "",
          message: value,
          isRead: false,
        })
        try {
          const response = await fetch(
            `https://mailbox-client-17386-default-rtdb.asia-southeast1.firebasedatabase.app/${myId}/sentbox.json`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(mailDetails),
            }
          )

          if (response.ok) {
            console.log("Email sent successfully")
          } else {
            console.error("Failed to send email")
          }
        } catch (error) {
          console.error("Error sending email:", error)
        }
      } else {
        console.error("Failed to send email")
      }
    } catch (error) {
      console.error("Error sending email:", error)
    }
  }

  console.log(mailDetails)
  return (
    <div className=" flex my-7  justify-center h-auto  ">
      <form
        onSubmit={sendText}
        className=" flex flex-col relative rounded-xl  h-[90vh] border shadow-lg w-[80%] pb-0  p-5 px-12 "
      >
        <input
          placeholder="To:"
          className=" w-[100%] p-2 outline-none border-b-2"
          type="email"
          value={mailDetails.email}
          onChange={(e) => {
            handleInputs({ email: e.target.value })
          }}
          required
        />
        <input
          placeholder="Subject:"
          className=" w-[100%] p-2 outline-none border-b-2"
          type="text"
          value={mailDetails.subject}
          onChange={(e) => {
            handleInputs({ subject: e.target.value })
          }}
          required
        />

        <ReactQuill
          className=" overflow-scroll h-[80%] relative mt-2"
          theme="snow"
          value={value}
          onChange={setValue}
          required
        ></ReactQuill>
        <button
          type="submit"
          // onClick={sendText}
          className=" bg-slate-600 p-2 px-4 ml-auto w-[15%] m-3  "
        >
          Send
        </button>
      </form>
    </div>
  )
}

export default Editor
