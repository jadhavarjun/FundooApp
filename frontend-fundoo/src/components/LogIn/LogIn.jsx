import React, { Component } from 'react';
import Alert from '@material-ui/lab/Alert';
import { Button, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './logIn.css';
import FundooLogo from '../fundoo_logo';
import Snackbar from '@material-ui/core/Snackbar';

import UserServices from '../../services/userService';
let userServices = new UserServices();
class LogIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: [],
            alert: 0,
            showAlert: false,
            emailError: false,
            emailErrorMsg: "",
            passwordError: false,
            passwordErrorMsg: "",
            snackbarOpen: false,
            snackbarMsg: ""

        }
    }

    handleChange = (key, value) => {
        const { user } = this.state;
        this.state.user[key] = value;
        this.setState({ emailError: false, passwordError: false, snackbarOpen: false })
        this.setState({ emailErrorMsg: "", passwordErrorMsg: "" })
        
        this.setState({ user })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { user } = this.state;

        let flag = true;
        const emailRegex = RegExp(/^[a-zA-Z0-9]+([._+-][0-9a-zA-Z]+)*@[a-zA-Z0-9]+.[a-zA-Z]{2,4}([.][a-zA-Z]{2,3})?$/);
        const passwordRegex = RegExp(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/);

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

        if (flag) {
            // console.log(user);
            let data = {
                email: user.email,
                password: user.password
            }
            userServices.logIn(data)
                .then((result) => {
                    // this.setState({ alert: 1, showAlert: true, user: [], })
                    // this.setState({snackbarOpen:true, snackbarMsg:"User Login SuccessFully!!!!"})
                    localStorage.setItem('token', result.data.data.token);
                    localStorage.setItem('userid', result.data.data._id);
                    localStorage.setItem('email', result.data.data.email);

                    console.log(result);
                    // window.location.realod();
                    this.props.history.push('/appbar');
                })
                .catch((error) => {
                    // this.setState({ alert: 2, showAlert: true })
                    this.setState({ snackbarOpen: true, snackbarMsg: "User Not Login!!" })
                    console.log(error);
                })
        }

    }

    render() {
        const {emailError, emailErrorMsg, passwordError, passwordErrorMsg} = this.state
        return (
            <div className="container">
                <Snackbar
                    anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
                    open={this.state.snackbarOpen}
                    autoHideDuration={3000}
                    onClose={this.handleChange}

                    message={<span id="message-id">{this.state.snackbarMsg}</span>}
                />
                {this.state.showAlert &&
                    <div>
                        {

                            this.state.alert == 1 ? <Alert severity="success">User Login Successfully!!</Alert>
                                : <Alert severity="error">Login Fail!</Alert>
                        }
                    </div>
                }
                <div className="login">
                    <div className="border">
                        <div className="login_box">
                            <div className="login_input">
                                <FundooLogo />
                                <div>
                                    <h1 className="h1">Sign In</h1>
                                    <h1 className="h1">Use Your Fundoo Account</h1>
                                </div>
                                <div className="login_form">
                                    <form className="form" onClick={this.handleSubmit}>
                                        <div className="form_textfield">
                                            <div className="textfield">
                                                <TextField id="outlined"
                                                    size="small"
                                                    label="Email"
                                                    error={emailError}
                                                    helperText={emailErrorMsg}
                                                    onChange={(e) => this.handleChange("email", e.target.value)}
                                                    variant="outlined"
                                                    fullWidth />
                                            </div>

                                            <div className="textfield">
                                                <TextField id="outlined"
                                                    size="small"
                                                    label="Password"
                                                    error={passwordError}
                                                    helperText={passwordErrorMsg}
                                                    onChange={(e) => this.handleChange("password", e.target.value)}
                                                    type="password"
                                                    variant="outlined"
                                                    fullWidth />
                                            </div>
                                        </div>

                                        <div className="forgot">
                                            <Button color="primary">
                                                <Link to={{ pathname: `/forgot_password` }}>Forgot Password</Link>
                                            </Button>
                                        </div>
                                        <div className="footer">
                                            <div className="signIn">
                                                <Button color="primary">
                                                    <Link to={{ pathname: `/signup` }}>Create Account</Link>
                                                </Button>
                                            </div>
                                            <div className="button">
                                                <Button variant="contained" color="primary">SignIn</Button>
                                            </div>

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default LogIn;