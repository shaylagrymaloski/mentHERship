import "../App.css";
import React, {Component} from "react";
import FormValidator from '../FormValidator';
import Header from "../components/Header/index"
import Footer from "../components/Footer/index"



class Register extends Component{
  constructor(){
    super();

    this.onValueChange = this.onValueChange.bind(this);

    this.validator = new FormValidator([{
      field: 'first_name',
      method: 'isEmpty',
      validWhen: false,
      message: 'Enter first name.'
    }, {
    field: 'last_name',
    method: 'isEmpty',
    validWhen: false,
    message: 'Enter last name.'
    }, {
    field: 'email',
    method: 'isEmpty',
    validWhen: false,
    message: 'Enter your email address.'
    }, {
    field: 'email',
    method: 'isEmail',
    validWhen: true,
    message: 'Enter valid email address.'
    }, {
    field: 'password',
    method: 'isEmpty',
    validWhen: false,
    message: 'Enter password.'
    }, {
    field: 'password_confirmation',
    method: 'isEmpty',
    validWhen: false,
    message: 'Enter password confirmation.'
    }, {
    field: 'password_confirmation',
    method: this.passwordMatch,
    validWhen: true,
    message: 'Password and password confirmation do not match.'
    }, {
    field: 'university',
    method: 'isEmpty',
    validWhen: false,
    message: 'Enter canadian university.'
    }]);
    this.state = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
    university: '',
    validation: this.validator.valid(),
    }
    this.submitted = false;
  }


  passwordMatch = (confirmation, state) => (state.password === confirmation)
  handleInputChange = event => {
  event.preventDefault();
  this.setState({
  [event.target.name]: event.target.value,
  });
  }

  handleFormSubmit = event => {
  event.preventDefault();
  alert('You have registered')
  const validation = this.validator.validate(this.state);
  this.setState({
  validation
  });

 

  this.submitted = true;
  if(validation.isValid) {
  //success
  }
  }

  onValueChange(event) {
    this.setState({
      selectedOption: event.target.value
    });
  }

  render() {
  let validation = this.submitted ?this.validator.validate(this.state) : this.state.validation
  return (
  <div className="container">
    <Header />
    <div className="row">
      <div className="col-md-4 col-md-offset-4">
        <form className="registrationForm">
          <h2>Registration</h2>
          <div className={validation.email.isInvalid && 'has-error'}>
            <label className="registerText" htmlFor = "first_name">First Name</label>
            <input type="string" className="form-control" name="first_name" placeholder="First Name" onChange={this.handleInputChange} /> <span className="help-block">{validation.first_name.message}</span> </div>
            <div className={validation.email.isInvalid && 'has-error'}>
            <label className="registerText" htmlFor = "last_name">Last Name</label>
            <input type="string" className="form-control" name="last_name" placeholder="Last Name" onChange={this.handleInputChange} /> <span className="help-block">{validation.last_name.message}</span> </div>
            <div className={validation.email.isInvalid && 'has-error'}>
            <label className="registerText" htmlFor = "email">Email address</label>
            <input type="email" className="form-control" name="email" placeholder="Email address" onChange={this.handleInputChange} /> <span className="help-block">{validation.email.message}</span> </div>
            <div className={validation.password.isInvalid && 'has-error'}>
            <label className="registerText" htmlFor = "password">Password</label>
            <input type="password" className="form-control" name="password" placeholder="Password" onChange={this.handleInputChange} /> <span className="help-block">{validation.password.message}</span> </div>
            <div className={validation.password_confirmation.isInvalid && 'has-error'}>
            <label className="registerText" htmlFor = "password_confirmation">Confirm Password</label>
            <input type="password" className="form-control" name="password_confirmation" placeholder="Confirm Password" onChange={this.handleInputChange} /> <span className="help-block">{validation.password_confirmation.message}</span> </div>
            <h4>Do you want to be a mentee or mentor?</h4>
            <div className="radio">
          <label>
            <input
              type="radio"
              value="Mentee"
              checked={this.state.selectedOption === "Mentee"}
              onChange={this.onValueChange}
            />
            Mentee
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              value="Mentor"
              checked={this.state.selectedOption === "Mentor"}
              onChange={this.onValueChange}
            />
            Mentor
          </label>
        </div>
       
        <div>
          <h4>Which university are you interested in?</h4>
          <div className={validation.email.isInvalid && 'has-error'}>
            <label htmlFor = "university">Canadian University</label>
            <input type="string" className="form-control" name="university" placeholder="University" onChange={this.handleInputChange} /> <span className="help-block">{validation.university.message}</span> </div>
        </div>
            <button type="submit" onClick={this.handleFormSubmit} className="btn btn-primary"> Register </button>
        </form>
      </div>
    </div>
    <Footer />
  </div>
  )
  }
}
  
  export default Register;
   