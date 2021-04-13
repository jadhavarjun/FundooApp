import React from 'react';
import { Component } from 'react';
import { Modal } from 'react-bootstrap'
import './getNote.css'
import { Input, Button, Typography  } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import ToggleDisplay from 'react-toggle-display';
import NoteIcon from '../NoteIcons/icons'
import TrashNote from './TrashNote/trashNote'
import UserServices from '../../services/userService';
let userServices = new UserServices();

class GetNotes extends Component {
    state = {
        note: [],
        showModal: false,
        show: false,
        id: null,
        idForUpdate: null,
        titileForUpdate: "",
        descriptionForUpdate: "",
        noteForUpdate: [],
        title: '',
        description: '',
        createShow: true,
        createNote: [
            {
                title:"",
                description:""
            }
        ]

    }    
    componentDidMount = () => {
        this.fetchNote();
    }
    fetchNote = () => {
        userServices.getAllNotes()
            .then((result) => {
                this.setState({ note: result.data.data })
                console.log(result.data.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }
    showModal = (e, id, title, description) => {
        e.preventDefault()
        this.setState({ show: true, idForUpdate: id, titileForUpdate: title, descriptionForUpdate: description })
        const { noteForUpdate } = this.state
        noteForUpdate["title"] = title
        noteForUpdate["description"] = description
        this.setState({ noteForUpdate })
    }

    handleUpdateChange = (key, value) => {
        const { noteForUpdate } = this.state
        noteForUpdate[key] = value

        this.setState({ noteForUpdate })
    }

    handleUpdateSubmit = (e) => {
        e.preventDefault()
        const { noteForUpdate } = this.state
        let data = {
            title: noteForUpdate.title,
            description: noteForUpdate.description
        }

        userServices.updateNote(data, this.state.idForUpdate)
            .then((result) => {
                this.fetchNote();
                console.log(result)
                this.setState({ show: false })
            })
            .catch((error) => {
                console.log(error);
            })
        this.setState({ show: false })

    }

    handleClickShow = () => {
        this.setState({
            createShow: !this.state.createShow
        });
    }

    handleChange = (key, value) => {
        const { createNote } = this.state
        createNote[key] = value
        console.log(createNote);
        this.setState({ createNote })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { createNote } = this.state
        let data = {
            title: createNote.title,
            description: createNote.description
        }
        userServices.createNotes(data)
            .then((result) => {
                this.fetchNote();
                this.setState(createNote.title="",createNote.description="")
                console.log(result);
            }).catch((err) => {
                console.log(err);
            });
            
    }


    render() {
        return (
            <>

                <div className="container">
                    <ToggleDisplay show={this.state.createShow}>
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
                        <ToggleDisplay show={!this.state.createShow}>
                            <Card className="addnotedata">

                                <div >
                                    <Input
                                        className="addtitleinput"
                                        disableUnderline={true}
                                        type="text"
                                        placeholder="Title"
                                        value={this.state.createNote.title}
                                        onChange={(e) => this.handleChange("title", e.target.value)}
                                    />
                                </div>

                                <Input
                                    className="addnoteinput"
                                    disableUnderline={true}
                                    type="text"
                                    placeholder="Take a note..."
                                    value={this.state.createNote.description}
                                    onChange={(e) => this.handleChange("description", e.target.value)}
                                />
                                <div className="bottom_bar">
                                    <NoteIcon className="icons"/>
                                    <div className="close_btn">
                                        <Button id="closebutton" type="submit" onClick={() => { this.handleClickShow() }}>Close</Button>
                                    </div>
                                </div>
                            </Card>
                        </ToggleDisplay>
                    </form>
                </div>


                <div className='noteList'>
                    {this.state.note.length > 0 ?
                        <div className="displayNotes" >
                            <div className="flex_card">
                                {this.state.note.filter((obj)=> obj.isTrash != true && obj.isArchive != true).map((item) => {
                                    return <div>
                                        <div className='note_box' style={{backgroundColor:item.colorNote}}>
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

                    <Modal
                        show={this.state.show}
                        className="model-lg"
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered>
                        <Modal.Body className='updateNote'>
                            <div className="update_box">
                                <input className='title'
                                    defaultValue={this.state.titileForUpdate}
                                    onChange={(e) => this.handleUpdateChange("title", e.target.value)}
                                />
                                <textarea className='description'
                                    defaultValue={this.state.descriptionForUpdate}
                                    onChange={(e) => this.handleUpdateChange("description", e.target.value)}
                                />
                            </div>
                            <div className="icon_closebtn">
                                <div className="icons">
                                    <NoteIcon />
                                </div>
                                <div className="close_btn">
                                    <button className='model-close' onClick={(e) => this.handleUpdateSubmit(e)}>Close</button>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
                <div>

                </div>
            </>
        )
    }
}
export default GetNotes;