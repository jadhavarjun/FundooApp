import React, { Component } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import InsertPhotoOutlinedIcon from '@material-ui/icons/InsertPhotoOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import ColorPalete from '../NoteIcons/colorPalete'
import './Icons.css'

import UserServices from '../../services/userService';
let userServices = new UserServices();

class NoteIcons extends Component {
    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null,
            deleteId: this.props.id,
        }
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        console.log(this.state.deleteId);
        this.setState({ anchorEl: null });
    };

    deleteNoteForever = () => {
        userServices.deleteNote(this.state.deleteId)
            .then((result) => {
                console.log(result)
                this.handleClose()
                this.props.getNotes();
                // window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            })
        this.setState({ show: false })
    }

    deleteNote = () => {
        userServices.trashNote(this.state.deleteId)
            .then((result) => {
                console.log(result)
                this.handleClose()
                this.props.getNotes();
            })
            .catch((error) => {
                console.log(error);
            })
        this.setState({ show: false })
    }

    archive = () => {
        userServices.archiveNote(this.state.deleteId)
            .then((result) => {
                console.log(result)
                this.handleClose()
                this.props.getNotes();
            })
            .catch((error) => {
                console.log(error);
            })
        this.setState({ show: false })
    }
    render() {
        const { anchorEl } = this.state;
        return (
            <div className="bottom_bar">
                <div className="img">
                    <IconButton id="notebuttons">
                        <AddAlertOutlinedIcon alt="Rreminder" fontSize="small" />
                    </IconButton>
                    <IconButton id="notebuttons">
                        <PersonAddOutlinedIcon alt="Collabrator" fontSize="small"/>
                    </IconButton>
                    <IconButton id="notebuttons">
                        {/* <ColorLensOutlinedIcon alt="Color" /> */}
                        <ColorPalete id={this.props.id} getNotes={this.props.getNotes}/>
                    </IconButton>
                    <IconButton id="notebuttons">
                        <InsertPhotoOutlinedIcon alt="Photo" fontSize="small"/>
                    </IconButton>
                    <IconButton id="notebuttons" onClick={this.archive}>
                        <ArchiveOutlinedIcon fontSize="small"/>
                    </IconButton>

                    <IconButton id="notebuttons"
                        // aria-owns={anchorEl ? 'simple-menu-items' : null}
                        aria-haspopup="true"
                        onClick={this.handleClick}
                    >
                        <MoreVertOutlinedIcon fontSize="small"/>
                    </IconButton>

                    <Menu
                        style={{ marginTop: 40 }}
                        className="deleteNote"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={this.handleClose}
                    >
                        
                        <MenuItem onClick={this.handleClose}>Add label</MenuItem>
                        {window.location.href == "http://localhost:3001/dashboard/trash" ? <MenuItem onClick={this.deleteNoteForever}>Delete note forever</MenuItem> : <MenuItem onClick={this.deleteNote}>Delete note</MenuItem>}
                    </Menu>

                </div>
                {/* <div className="close_btn">
                    <Button id="closebutton" type="submit" onClick={() => { this.handleClickShow() }}>Close</Button>
                </div> */}
            </div>

        )
    }

}
export default NoteIcons;