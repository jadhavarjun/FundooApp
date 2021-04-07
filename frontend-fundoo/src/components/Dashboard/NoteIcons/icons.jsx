import React, { Component } from 'react';
import { Input, Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import InsertPhotoOutlinedIcon from '@material-ui/icons/InsertPhotoOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';


class NoteIcons extends Component {
    render() {
        return(
            <div className="bottom_bar">
                <div className="img">
                    <IconButton color="primary" id="notebuttons">
                        <AddAlertIcon alt="Rreminder"/>
                    </IconButton>
                    <IconButton color="primary" id="notebuttons">
                        <PersonAddOutlinedIcon alt="Collabrator"/>
                    </IconButton>
                    <IconButton color="primary" id="notebuttons">
                        <ColorLensOutlinedIcon alt="Color"/>
                    </IconButton>
                    <IconButton color="primary" id="notebuttons">
                        <InsertPhotoOutlinedIcon alt="Photo"/>
                    </IconButton>
                    <IconButton color="primary" id="notebuttons">
                        <ArchiveOutlinedIcon/>
                    </IconButton>

                    <IconButton color="primary" id="notebuttons"
                        // aria-owns={anchorEl ? 'simple-menu-items' : null}
                        // aria-haspopup="true"
                    >
                        <MoreVertOutlinedIcon/>
                    </IconButton>
                </div>
                {/* <div className="close_btn">
                    <Button id="closebutton" type="submit" onClick={() => { this.handleClickShow() }}>Close</Button>
                </div> */}
            </div>

        )
    }

}
export default NoteIcons;