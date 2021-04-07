import React, { Component } from 'react';
// import DisplayNotes from './DisplayNotes';
import Card from '@material-ui/core/Card';
import { Input, Button } from '@material-ui/core';
import ToggleDisplay from 'react-toggle-display';
import NoteIcons from '../NoteIcons/icons'
import './CreateNotes.css'


class Note extends Component {
    constructor() {
        super();

        this.state = {
            show: true,
            notetitle: null,
            notedata: null
        }

    }

    handleClickShow=()=> {
        this.setState({
            show: !this.state.show
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

                <form id="submit-form">
                    <ToggleDisplay show={!this.state.show}>
                        <Card className="addnotedata">

                            <div >
                                <Input
                                    className="addtitleinput"
                                    disableUnderline={true}
                                    type="text"
                                    placeholder="Title"
                                    onInput={e => this.setState({ notetitle: e.target.value })}
                                />
                            </div>

                            <Input
                                className="addnoteinput"
                                disableUnderline={true}
                                type="text"
                                placeholder="Take a note..."
                                onInput={e => this.setState({ notedata: e.target.value })}

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