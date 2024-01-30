import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { authActions } from "../../store/authSlice"
const SignUp = () => {
  const [signUpMode, setSignUpMood] = useState(true)
  const authState = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })
  console.log(inputs)
  const style = {
    backgroundColor: "#E1EEEE",
    color: "red",
  }
  const handleInput = () => {}
  const style2 = {
    backgroundColor: "#222831",
  }
  const style3 = {
    borderColor: "#00ADB5",
    backgroundColor: "#00ADB5",
  }
  const handleSignIn = async () => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCGkRIX3D99xCNcQP0NCIf2N06cPpAyC80",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: inputs.email,
            password: inputs.password,
            returnSecureToken: true,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error.message || "Invalid email or password")
      }
      dispatch(authActions.setLogIn(true))
      dispatch(authActions.setEmail(data.email))
      dispatch(authActions.setToken(data.idToken))
      //   props.setId(data.idToken)
      //   props.setLogIn(true)
      console.log("Sign-in successful:", data)
      localStorage.setItem(
        "user2",
        JSON.stringify({ email: data.email, idToken: data.idToken })
      )
    } catch (error) {
      alert(error.message)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!signUpMode) {
      handleSignIn()
      return
    }
    if (inputs.password === inputs.confirmPassword) {
      try {
        const sendRequest = async () => {
          try {
            const response = await fetch(
              "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCGkRIX3D99xCNcQP0NCIf2N06cPpAyC80",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email: inputs.email,
                  password: inputs.password,
                  returnSecureToken: true,
                }),
              }
            )

            const data = await response.json()

            if (!response.ok) {
              throw new Error(data.error.message || "Something went wrong")
            }

            console.log("Registration successful:", data)
          } catch (error) {
            console.error("Error during registration:", error.message)
          }
        }

        sendRequest()
      } catch (error) {
        console.log(error)
      }
    } else {
      alert("Confirm Password correctly!")
    }
    setInputs({ email: "", password: "", confirmPassword: "" })
  }
  return (
    <div style={style} className=" pt-12 min-h-[100vh] ">
      {/* <div
        style={style2}
        className=" header h-14 items-center flex justify-center w-screen bg-slate-900"
      >
        <h1 className=" text-xl">Mailbox</h1>
      </div> */}
      <div
        style={style3}
        //
        className=" rounded-2xl  bg-slate-900 border-2 m-auto  w-[65%] grid grid-cols-2 h-[80vh]"
      >
        <div style={style3} className=" rounded-l-2xl 1st mr-0  m-3">
          {" "}
        </div>
        <div className=" m-3 ml-0 relative  rounded-r-2xl  2nd  px-8 py-5 ">
          <form onSubmit={handleSubmit} className="flex  flex-col">
            <h1 className=" text-slate-700">
              {signUpMode ? "Sign Up" : "Sign In"}
            </h1>
            <div className="mb-2">
              <label
                htmlFor="email"
                className=" block   text-start font-bold  text-black mb-2"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={inputs.email}
                onChange={(e) =>
                  setInputs((prev) => {
                    return { ...prev, email: e.target.value }
                  })
                }
                className="w-full px-3 py-1 outline-none  rounded-md border"
                required
              />
            </div>
            {
              <div className="mb-2">
                <label
                  htmlFor="password"
                  className="block text-start text-black font-bold  mb-2"
                >
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  value={inputs.password}
                  onChange={(e) =>
                    setInputs((prev) => {
                      return { ...prev, password: e.target.value }
                    })
                  }
                  className="w-full px-3 py-1 outline-none  rounded-md border"
                  required
                />
              </div>
            }

            {signUpMode && (
              <div
                className="mb-2
                 
              "
              >
                <label
                  htmlFor="confirmPassword"
                  className="block text-start font-bold text-black mb-2"
                >
                  Confirm Password:
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={inputs.confirmPassword}
                  onChange={(e) =>
                    setInputs((prev) => {
                      return { ...prev, confirmPassword: e.target.value }
                    })
                  }
                  className="w-full px-3 py-1 outline-none rounded-md border"
                  required
                />
              </div>
            )}
            {/* )} */}

            {/* {showLogInPage && ( */}
            <p
              // onClick={forgetPasswordHandler}
              className="cursor-pointer underline text-red-900 text-start  hover:underline"
            >
              Forgotten Password?
            </p>

            {/* )} */}
            <button
              //   whileHover={{ scale: 1.1 }}
              //   transition={{ type: "spring", stiffness: 400, damping: 10 }}
              type="submit"
              className="bg-blue-800 hover:bg-blue-600 font-bold self-center mt-4  text-white px-14 text-lg py-2 rounded-md"
            >
              {signUpMode ? "Sign Up" : "Sign In"}
            </button>
            <p
              onClick={() => {
                setSignUpMood(() => {
                  if (signUpMode) return false
                  return true
                })
              }}
              className="cursor-pointer underline text-red-900   hover:underline"
            >
              {signUpMode ? "Have an account?" : " Want to sign up?"}
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp
