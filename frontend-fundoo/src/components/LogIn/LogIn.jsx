import React, { Component } from 'react';
import { Button, TextField, Checkbox } from '@material-ui/core';
import './LogIn.css'

class LogIn extends Component {
    render() {
        return (
            <div className="login">
                <div className="border">
                    <div className="login_box">
                        <div className="login_input">
                            <div className="login_logo">
                                <font color="#1976d2"><b>F</b></font>
                                <font color="#FF0000"><b>u</b></font>
                                <font color="#FFD700"><b>n</b></font>
                                <font color="#1976d2"><b>d</b></font>
                                <font color="#FF0000 "><b>o</b></font>
                                <font color="#006400"><b>o</b></font>
                            </div>
                            <div>
                                <h1 className="h1">Sign In</h1>
                                <h1 className="h1">Use Your Fundoo Account</h1>
                            </div>
                            <div className="login_form">
                                <form className="form">
                                    <div className="form_textfield">
                                        <div className="textfield">
                                            <TextField id="outlined"
                                                size="small"
                                                label="Usermail"
                                                name="email"
                                                onChange={this.handleChange}
                                                variant="outlined"
                                                fullWidth />
                                        </div>

                                        <div className="textfield">
                                            <TextField id="outlined"
                                                size="small"
                                                label="Password"
                                                name="password"
                                                onChange={this.handleChange}
                                                type="password"
                                                variant="outlined"
                                                fullWidth />
                                        </div>
                                    </div>

                                    <div className="forgot">
                                        <Button color="primary">
                                            Forgot Password
                                        </Button>
                                    </div>
                                    <div className="footer">
                                        <div className="signIn">
                                            <Button color="primary">
                                                Create Account
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
        )
    }
}
export default LogIn;