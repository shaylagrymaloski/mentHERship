import "../App.css";
import React, {useState, useRef} from "react";
import Header from "../components/Header/index"
import Footer from "../components/Footer/index"

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
    
    <div class="container">
      <Header />
      <h3>Welcome back!</h3>
      <h1 class="pageTitle">Login</h1>
      <form>
        <div id="loginDiv">
          <label class="registerText">Email</label>
            <input 
              type="text" 
              name="email" 
              placeholder="Email" 
              ref={emailRef} 
              onChange={handleEmailChange}
            />
          <br></br>
          <label class="registerText">Password</label>
            <input 
              type="password" 
              className="form-control"
              name="password" 
              placeholder="Password" 
              ref={passwordRef} 
              onChange={handlePasswordChange}
            />
        </div>
        
        <div>
          <button type="submit" onClick={handleSubmit}>Log In</button>
        </div>
      </form>
      <Footer/>
    </div>
    
  )
};
  
  export default Login;