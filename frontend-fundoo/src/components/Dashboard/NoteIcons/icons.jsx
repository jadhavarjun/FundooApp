import React, { Component } from 'react';
import { Input, Button } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import InsertPhotoOutlinedIcon from '@material-ui/icons/InsertPhotoOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import './Icons.css'


class NoteIcons extends Component {
    constructor() {
        super();

        this.state = {
            anchorEl: null,
        }
    }
    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };
    render() {
        const { anchorEl } = this.state;
        return (
            <div className="bottom_bar">
                <div className="img">
                    <IconButton id="notebuttons">
                        <AddAlertOutlinedIcon alt="Rreminder" />
                    </IconButton>
                    <IconButton id="notebuttons">
                        <PersonAddOutlinedIcon alt="Collabrator" />
                    </IconButton>
                    <IconButton id="notebuttons">
                        <ColorLensOutlinedIcon alt="Color" />
                    </IconButton>
                    <IconButton id="notebuttons">
                        <InsertPhotoOutlinedIcon alt="Photo" />
                    </IconButton>
                    <IconButton id="notebuttons">
                        <ArchiveOutlinedIcon />
                    </IconButton>

                    <IconButton id="notebuttons"
                        // aria-owns={anchorEl ? 'simple-menu-items' : null}
                        aria-haspopup="true"
                        onClick={this.handleClick}
                    >
                        <MoreVertOutlinedIcon />
                    </IconButton>

                    <Menu
                        style={{ marginTop: 40 }}
                        className="deleteNote"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={this.handleClose}
                    >
                        <MenuItem onClick={this.handleClose}>Delete note</MenuItem>
                        <MenuItem onClick={this.handleClose}>Add label</MenuItem>
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