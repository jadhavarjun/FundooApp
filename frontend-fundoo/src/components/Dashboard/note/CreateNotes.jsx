import React, { Component } from 'react';
// import DisplayNotes from './DisplayNotes';
import Card from '@material-ui/core/Card';
import { Input, Button } from '@material-ui/core';
import ToggleDisplay from 'react-toggle-display';
import IconButton from '@material-ui/core/IconButton';
import newnotewithimage from '../../../Assets/newnotewithimage.svg';
import collaborator from '../../../Assets/collaborator.svg';
import changecolor from '../../../Assets/changecolor.svg';
import archive from '../../../Assets/archive.svg';
import more from '../../../Assets/more.svg';
import remindme from '../../../Assets/reminder.svg';
import './CreateNotes.css'


class Note extends Component {
    constructor() {
        super();

        this.state = {
            show: true,
            notetitle: null,
            notedata: null
        }

        this.handleClickShow = this.handleClickShow.bind(this);

    }

    handleClickShow() {
        this.setState({
            show: !this.state.show
        });
    }


    render() {
        const { anchorEl } = this.state;
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
                                <div className="img">
                                <IconButton color="primary" id="notebuttons">
                                    <img src={remindme} alt="remindme" id="noteicons" />
                                </IconButton>
                                <IconButton color="primary" id="notebuttons">
                                    <img src={collaborator} alt="collaborator" id="noteicons" />
                                </IconButton>

                                <IconButton color="primary" id="notebuttons">
                                    <img src={changecolor} alt="changecolor" id="noteicons" />
                                </IconButton>

                                <IconButton color="primary" id="notebuttons">
                                    <img src={newnotewithimage} alt="newnotewithimage" id="noteicons" />
                                </IconButton>

                                <IconButton color="primary" id="notebuttons">
                                    <img src={archive} alt="archive" id="noteicons" />
                                </IconButton>

                                <IconButton color="primary" id="notebuttons"
                                    aria-owns={anchorEl ? 'simple-menu-items' : null}
                                    aria-haspopup="true"
                                >
                                    <img src={more} alt="more" id="noteicons" />
                                </IconButton>
                                </div>
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