import "../App.css";
import React, {useState, useRef} from "react";

const Login = () => {
  const [email, setEmail] = useState([])
  const [password, setPassword] = useState([])
  const emailRef = useRef()
  const passwordRef = useRef()

  const handleSubmit = event => {
    event.preventDefault();
    alert('You have submitted the form')
    // should make it go to chat page after log in
    // if pass or user is not authorized, print error message
  }

  const handleEmailChange = event => {
    const email = emailRef.current.value
    if (email === '') return
    //console.log(email)

    setEmail(emailRef.current.value)
  }

  const handlePasswordChange = event => {
    const pass = passwordRef.current.value
    if (pass === '') return
   // console.log(pass)

    setPassword(passwordRef.current.value)
  }


  return(
    <div>
      <h1>LOGIN</h1>
      <form>
        <label>
          <span>Email</span>
          <input name="email" ref={emailRef} onChange={handleEmailChange}/>
        </label>
        <br></br>
        <label>
          <span>Password</span>
          <input name="password" ref={passwordRef} onChange={handlePasswordChange}/>
        </label>
        <div>
          <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>
      </form>
    </div>
    
  )
};
  
  export default Login;