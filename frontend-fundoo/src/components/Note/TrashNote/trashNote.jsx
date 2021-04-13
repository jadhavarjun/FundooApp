import React from 'react';
import { Component } from 'react';
import { Input, Button, Typography  } from '@material-ui/core';
// import GetNote from '../getNote';
import NoteIcon from '../../NoteIcons/icons'
import UserServices from '../../../services/userService';
let userServices = new UserServices();

class TrashNote extends Component {
    constructor(props){
        super(props)
        this.state={
            note:[],
        }
    }
    componentDidMount(){
        userServices.getAllNotes()
            .then((result) => {
                this.setState({ note: result.data.data })
                console.log(";;;;;;;;;;;;", result.data.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return (
            <div>
                {this.state.note.length > 0 ?
                    <div className="displayNotes" >
                        <div className="flex_card">
                            {this.state.note.filter((obj) => obj.isTrash == true).map((item) => {

                                return <div>
                                    <div className='note_box'  style={{backgroundColor:item.colorNote}}>
                                        <div className="input_box" onClick={(e) => this.showModal(e, item._id, item.title, item.description)}>
                                            <h5 className="textField"> {item.title}</h5>
                                            <Typography className="textField">{item.description}</Typography>
                                        </div>
                                        <div className="option_container">
                                            <div className='icon_option'>
                                                <NoteIcon id={item._id} getNotes={this.fetchNote} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                    : null}
            </div>

        )
    }
}
export default TrashNote;