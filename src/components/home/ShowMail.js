import React from "react"

const ShowMail = (props) => {
  return (
    <div>
      <h1>Email: {props.email}</h1>
      <h1>Subject:{props.subject} </h1>
      <h1>message</h1>
      <div dangerouslySetInnerHTML={{ __html: props.message }} />
    </div>
  )
}

export default ShowMail
