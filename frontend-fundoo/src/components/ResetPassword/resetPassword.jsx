import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import { Button, TextField } from '@material-ui/core';
import FundooLogo from '../fundoo_logo';
import UserServices from '../../services/userService';


let userServices = new UserServices();
class ResetPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: [],
            alert: 0,
            showAlert: false,
            passwordError: false,
            passwordErrorMsg: "",
            confirmPassError: false,
            confirmPassErrorMsg:""

        }
    }

    handleChange = (key, value) => {
        const { user } = this.state;
        user[key] = value;
        this.setState({ confirmPassError: false, passwordError: false })
        this.setState({ confirmPassErrorMsg: "", passwordErrorMsg: "" })

        this.setState({ user })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { user } = this.state;

        let flag = true;
        const passwordRegex = RegExp(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/);

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

        let token = window.location.pathname.split("/")[2];
        console.log(token);
        if (flag) {
            // console.log(user);
            let data = {
                password: user.password
            }
            userServices.resetPassword(data, token)
                .then((data) => {
                    this.setState({ alert: 1, showAlert: true, user: [], })
                    this.props.history.push('/login');
                    console.log(data);
                })
                .catch((error) => {
                    this.setState({ alert: 2, showAlert: true })
                    console.log(error);
                })
        }

    }


    render() {
        return (
            <div>
                {this.state.showAlert &&
                    <div>
                        {
                            this.state.alert == 1 ? <Alert severity="success">Reset Password Successfully!!</Alert>
                                : <Alert severity="error">Reset Password Fail!</Alert>
                        }
                    </div>
                }
                <div className="login">
                    <div className="border">
                        <div className="login_box">
                            <div className="login_input">
                                <FundooLogo />
                                <div>
                                    {/* <h1 className="h1">Sign In</h1> */}
                                    <h1 className="h1">Reset Your Account Password</h1>
                                </div>
                                <div className="login_form">
                                    <form className="form" onClick={this.handleSubmit}>
                                        <div className="form_textfield">
                                            <div className="textfield">
                                                <TextField id="outlined"
                                                    size="small"
                                                    label="new password"
                                                    error={this.state.passwordError}
                                                    helperText={this.state.passwordErrorMsg}
                                                    onChange={(e) => this.handleChange("password", e.target.value)}
                                                    variant="outlined"
                                                    fullWidth />
                                            </div>

                                            <div className="textfield">
                                                <TextField id="outlined"
                                                    size="small"
                                                    label="confirm password"
                                                    error={this.state.confirmPassError}
                                                    helperText={this.state.confirmPassErrorMsg}
                                                    onChange={(e) => this.handleChange("conform_password", e.target.value)}
                                                    type="password"
                                                    variant="outlined"
                                                    fullWidth />
                                            </div>
                                        </div>

                                        {/* <div className="forgot">
                                            <Button color="primary">
                                                Forgot Password
                                        </Button>
                                        </div> */}
                                        <div className="footer">
                                        <div className="signIn">
                                            <Button color="primary">
                                                <Link to={{ pathname: `/login` }}>SignIn instead</Link>
                                            </Button>
                                        </div>
                                            <div className="button">
                                                <Button variant="contained" color="primary" onClick={this.submit}>Submit</Button>
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
export default ResetPassword;