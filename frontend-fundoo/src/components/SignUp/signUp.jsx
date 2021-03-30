import './signUp.css'
import React, { Component } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import '../App.css';
import Alert from '@material-ui/lab/Alert';
import { Button, TextField, Checkbox } from '@material-ui/core';
import UserServices from '../../services/userService';
// import Grid from "@material-ui/core/Grid";

//userService Object

let userServices = new UserServices();
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: 0,
      showAlert: false,
      msg: "",
      firstNameError: false,
      lastNameError: false,
      emailError: false,
      passwordError: false,
      confirmPassError: false,
      showPassword: false,
      user: [],
      firstNameErrorMsg: "",
      lastNameErrorMsg: "",
      emailErrorMsg: "",
      passwordErrorMsg: "",
      confirmPassErrorMsg: ""
    }
  }
  handleChange = (key, value) => {
    const { user } = this.state;
    user[key] = value;
    this.setState({ firstNameError: false, lastNameError: false, emailError: false, passwordError: false, confirmPassError: false })
    this.setState({ firstNameErrorMsg: "", lastNameErrorMsg: "", emailErrorMsg: "", passwordErrorMsg: "", confirmPassErrorMsg: "" })
    this.setState({ user })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { user } = this.state;

    let flag = true;
    const nameRegex = RegExp(/^[A-Z]{1}[A-Za-z]{2}/);
    const emailRegex = RegExp(/^[a-zA-Z0-9]+([._+-][0-9a-zA-Z]+)*@[a-zA-Z0-9]+.[a-zA-Z]{2,4}([.][a-zA-Z]{2,3})?$/);
    const passwordRegex = RegExp(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/);


    if (!user.first_name) {
      this.setState({ firstNameError: true, firstNameErrorMsg: "Name is Required" })
      flag = false;
    }
    else if (!nameRegex.test(user.first_name)) {
      this.setState({ firstNameError: true, firstNameErrorMsg: "Name Minimum 3 Characters" })
      flag = false;
    }

    if (!user.last_name) {
      this.setState({ lastNameError: true, lastNameErrorMsg: "Name is Required" })
      flag = false;
    }
    else if (!nameRegex.test(user.last_name)) {
      this.setState({ lastNameError: true, lastNameErrorMsg: "Name Minimum 3 Characters" })
      flag = false;
    }

    if (!user.email) {
      this.setState({ emailError: true, emailErrorMsg: "Email is Required" })
      flag = false;
    }
    else if (!emailRegex.test(user.email)) {
      this.setState({ emailError: true, emailErrorMsg: "Email Should be Proper Formate" })
      flag = false;
    }

    if (!user.password) {
      this.setState({ passwordError: true, passwordErrorMsg: "Password is Required" })
      flag = false;
    }
    else if (!passwordRegex.test(user.password)) {
      this.setState({ passwordError: true, passwordErrorMsg: "Password Should be Proper Formate" })
      flag = false;
    }

    if (!user.conform_password) {
      this.setState({ confirmPassError: true, confirmPassErrorMsg: "Password is Required" })
      flag = false;
    }
    else if (user.password != user.conform_password) {
      this.setState({ confirmPassError: true, confirmPassErrorMsg: "Password and Comfirm Password be Same" })
      flag = false;
    }
    // calling apis
    if (flag) {
      // console.log(user);
      let data = {
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        password: user.password
      }
      userServices.registration(data)
        .then((data) => {
          this.setState({ alert: 1, showAlert: true })
          console.log(data);
        })
        .catch((error) => {
          this.setState({ alert: 2, showAlert: true })
          console.log(error);
        })
    }
  }
  checkBox = () => {
    this.setState({ showPassword: !this.state.showPassword })
  }
  render() {
    return (
      <div>
        {this.state.showAlert &&
          <div>
            {
              this.state.alert == 1 ? <Alert severity="success">User Registered Successfully!!</Alert>
                : <Alert severity="error">User Not Able To Registered!</Alert>
            }
          </div>
        }
        <div className="registrationContainer">
          <div className="box_border">
            <div className="box">
              <div className="boxInput">
                <div className="fundoo_logo">
                  <font color="#1976d2"><b>F</b></font>
                  <font color="#FF0000"><b>u</b></font>
                  <font color="#FFD700"><b>n</b></font>
                  <font color="#1976d2"><b>d</b></font>
                  <font color="#FF0000 "><b>o</b></font>
                  <font color="#006400"><b>o</b></font>
                </div>
                <h4 className="title_tag">Create Your Fundoo Account</h4>
                <div className="flex-image">
                  <div className="form_parent">
                    <form className="form" onClick={this.handleSubmit}>
                      <div className="form_input">
                        <div className="input">
                          <TextField id="outlined" size="small"
                            name="first_name"
                            onChange={(e) => this.handleChange("first_name", e.target.value)}
                            label="First name"
                            variant="outlined"
                            fullWidth
                            error={this.state.firstNameError}
                            helperText={this.state.firstNameErrorMsg}
                          />
                        </div>

                        <div className="input">
                          <TextField id="outlined" size="small"
                            name="last_name"
                            error={this.state.lastNameError}
                            helperText={this.state.lastNameErrorMsg}
                            onChange={e => this.handleChange("last_name", e.target.value)}
                            label="Last name"
                            variant="outlined"
                            fullWidth
                          />
                        </div>
                      </div>

                      <div className="form_input">
                        <div className="email_Input">
                          <TextField id="outlined" size="small"
                            name="email"
                            error={this.state.emailError}
                            onChange={e => this.handleChange("email", e.target.value)}
                            label="Usermail"
                            variant="outlined"
                            fullWidth
                            helperText={this.state.emailErrorMsg}
                          />
                        </div>
                      </div>
                      <p>You can use letters, numbers & periods</p>
                      <div className="form_input">
                        <div className="input">
                          <TextField id="outlined" size="small"
                            name="password"
                            error={this.state.passwordError}
                            onChange={e => this.handleChange("password", e.target.value)}
                            type={this.state.showPassword ? "text" : "password"}
                            label="Password"
                            variant="outlined"
                            fullWidth
                            helperText={this.state.passwordErrorMsg}
                          />
                        </div>
                        <div className="input">
                          <TextField id="outlined" size="small"
                            name="conform_password"
                            error={this.state.confirmPassError}
                            onChange={e => this.handleChange("conform_password", e.target.value)}
                            type={this.state.showPassword ? "text" : "password"}
                            label="Confirm"
                            variant="outlined"
                            fullWidth
                            helperText={this.state.confirmPassErrorMsg}
                          />
                        </div>
                      </div>
                      <p>Use 8 more characters with a mix of letters, numbers & symbols</p>
                      <div className="checkBox" onClick={this.checkBox}>
                        <Checkbox
                          color="primary"
                          className="check" />
                              Show Password
                        </div>
                      {/* <p>Use 8 more characters with a mix of letters, numbers & symbols</p> */}
                      <div className="buttons">
                        <div class="signin">
                          <Button color="primary" className="sign_btn">SignIn instead</Button>
                        </div>
                        <div className="signupbutton">
                          <Button variant="contained" color="primary">SignUp</Button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="image">
                    <img src="https://ssl.gstatic.com/accounts/signup/glif/account.svg" alt="" width="244" height="244" class="j9NuTc TrZEUc"></img>
                    <figcaption class="figcap">One account. All of Fundoo working for you.</figcaption>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}


export default SignUp;