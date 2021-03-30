import React, { Component } from 'react';
import { Button, TextField, Checkbox } from '@material-ui/core';

class LogIn extends Component {
    render() {
        return (
            < div className="registrationContainer" >
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
                                            <div className="email_Input">
                                                <TextField id="outlined" size="small"
                                                    name="email"
                                                    onChange={e => this.handleChange("email", e.target.value)}
                                                    label="Usermail"
                                                    variant="outlined"
                                                    fullWidth
                                                />
                                            </div>
                                        </div>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div >

        )
    }
}
export default LogIn;