import { logDOM } from "@testing-library/react"
import React, { useState, useEffect } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
const Editor = () => {
  const [value, setValue] = useState("")
  const [mailDetails, setMailDetails] = useState({
    email: "",
    subject: "",
    message: value,
  })
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
  const sendText = async () => {
    try {
      const response = await fetch(
        "https://mailbox-client-17386-default-rtdb.asia-southeast1.firebasedatabase.app/sentbox.json",
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
        // Reset the form or perform any other necessary actions
      } else {
        console.error("Failed to send email")
      }
    } catch (error) {
      console.error("Error sending email:", error)
    }
  }

  console.log(mailDetails)
  return (
    <div className=" flex  justify-center h-auto  ">
      <div className=" flex flex-col relative rounded-xl  h-[90vh] border shadow-lg w-[70%] pb-0  p-5 px-16 ">
        <input
          placeholder="To:"
          className=" w-[100%] p-2 outline-none border-b-2"
          type="text"
          onChange={(e) => {
            handleInputs({ email: e.target.value })
          }}
        />
        <input
          placeholder="Subject:"
          className=" w-[100%] p-2 outline-none border-b-2"
          type="text"
          onChange={(e) => {
            handleInputs({ subject: e.target.value })
          }}
        />

        <ReactQuill
          className=" overflow-scroll h-[80%] relative mt-2"
          theme="snow"
          value={value}
          onChange={setValue}
        ></ReactQuill>
        <button
          onClick={sendText}
          className=" bg-slate-600 ml-auto w-[10%] m-3 p-2 px-6 "
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default Editor
