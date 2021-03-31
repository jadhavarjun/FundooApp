import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './forgot_password.css';
import { Button, TextField } from '@material-ui/core';
import './forgot_password.css'
import FundooLogo from '../fundoo_logo'
import UserServices from '../../services/userService'


let userServices = new UserServices();
class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            emailError: false,
            emailErrorMsg: "",
        }
    }

    handleChange = (key, value) => {
        const { data } = this.state;
        data[key] = value;
        this.setState({ emailError: false, emailErrorMsg: "" })
        this.setState({ data })

    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { data } = this.state;
        console.log("dddddddd", data)
        const emailRegex = RegExp(/^[a-zA-Z0-9]+([._+-][0-9a-zA-Z]+)*@[a-zA-Z0-9]+.[a-zA-Z]{2,4}([.][a-zA-Z]{2,3})?$/);
        let flag = true;
        if (!data.email) {
            this.setState({ emailError: true, emailErrorMsg: "Email is Required" })
            flag = false;
        }
        else if (!emailRegex.test(data.email)) {
            this.setState({ emailError: true, emailErrorMsg: "Email Should be Proper Formate" })
            flag = false;
        }

        if (data) {
            let email_data = {
                email: data.email,
            }
            userServices.forgotPassword(email_data)
                .then((data) => {
                    // this.setState({ alert: 1, showAlert: true })
                    console.log(data);
                })
                .catch((error) => {
                    // this.setState({ alert: 2, showAlert: true })
                    console.log(error);
                })
        }
    }

    render() {
        return (
            <div className="reset">
                <div className="reset_border">
                    <div className="reset_box">
                        <div className="reset_box_input">
                            {/* <div className="logo">
                                <font color="#1976d2"><b>F</b></font>
                                <font color="#FF0000"><b>u</b></font>
                                <font color="#FFD700"><b>n</b></font>
                                <font color="#1976d2"><b>d</b></font>
                                <font color="#FF0000 "><b>o</b></font>
                                <font color="#006400"><b>o</b></font>
                            </div> */}
                            <FundooLogo />
                            <div>
                                <h1 className="h1">Forgot Password</h1>
                            </div>
                            <div className="form_field">
                                <form className="form" onClick={this.handleSubmit}>
                                    <div className="form_input">
                                        <div className="input">
                                            <TextField id="outlined"
                                                size="small"
                                                label="Usermail"
                                                name="email"
                                                onChange={(e) => this.handleChange("email", e.target.value)}
                                                variant="outlined"
                                                fullWidth
                                                error={this.state.emailError}
                                                helperText={this.state.emailErrorMsg}
                                            />
                                        </div>
                                    </div>

                                    <div className="footer">
                                        <div className="signIn">
                                            <Button color="primary">
                                                <Link to={{ pathname: `/login` }}>SignIn</Link>
                                            </Button>
                                        </div>
                                        <div className="button">
                                            <Button variant="contained" color="primary">Submit</Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ForgotPassword;