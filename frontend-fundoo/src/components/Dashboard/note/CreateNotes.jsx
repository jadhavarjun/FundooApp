import React, { Component } from 'react';
// import DisplayNotes from './DisplayNotes';
import Card from '@material-ui/core/Card';
import { Input, Button } from '@material-ui/core';
import ToggleDisplay from 'react-toggle-display';
import NoteIcons from '../NoteIcons/icons'
import './CreateNotes.css'

import UserServices from '../../../services/userService';
let userServices = new UserServices();

class Note extends Component {
    constructor() {
        super();
        this.state = {
            show: true,
            note: []
        }
    }

    handleClickShow=()=> {
        this.setState({
            show: !this.state.show
        });
    }

    handleChange = (key, value) =>{
        const {note} = this.state
        note[key] = value
        console.log(note);
        this.setState({ note })
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        const {note} = this.state
        let data = {
            title: note.title,
            description: note.description
        }
        userServices.createNotes(data)
        .then((result) => {
            window.location.reload();
           console.log(result); 
        }).catch((err) => {
            console.log(err);
        });
    }


    render() {
        // const { anchorEl } = this.state;
        return (
            <div className="container">
                <ToggleDisplay show={this.state.show}>
                    <Card className="addnotetitle">
                        <Input
                            className="addnotetitleinput"
                            disableUnderline={true}
                            type="text"
                            placeholder="Take a note..."
                            onClick={() => this.handleClickShow()}
                        />

                    </Card>
                </ToggleDisplay>

                <form id="submit-form" onClick={this.handleSubmit}>
                    <ToggleDisplay show={!this.state.show}>
                        <Card className="addnotedata">

                            <div >
                                <Input
                                    className="addtitleinput"
                                    disableUnderline={true}
                                    type="text"
                                    placeholder="Title"
                                    onInput={e => this.setState({ notetitle: e.target.value })}
                                    onChange={(e) => this.handleChange("title", e.target.value)}
                                />
                            </div>

                            <Input
                                className="addnoteinput"
                                disableUnderline={true}
                                type="text"
                                placeholder="Take a note..."
                                onInput={e => this.setState({ notedata: e.target.value })}
                                onChange={(e) => this.handleChange("description", e.target.value)}
                            />
                            <div className="bottom_bar">
                                <NoteIcons />
                                <div className="close_btn">
                                    <Button id="closebutton" type="submit" onClick={() => { this.handleClickShow() }}>Close</Button>
                                </div>
                            </div>
                        </Card>
                    </ToggleDisplay>

                    {/* <DisplayNotes/> */}
                </form>
            </div>
        );
    }
}

export default Note;