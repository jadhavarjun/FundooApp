import React from 'react';
import { Component } from 'react';
import { Modal, Button } from 'react-bootstrap'
// import service from '../services/note';
import './getNote.css'
import NoteIcon from '../NoteIcons/icons'
// import '../styles/updateModel.scss'
// import {VscSymbolColor} from 'react-icons/vsc'
// import {BiImageAlt} from 'react-icons/bi'
// import {BiBellPlus} from 'react-icons/bi'
// import {BsPersonPlus} from 'react-icons/bs'
// import {FiTrash2} from 'react-icons/fi'
// import { UpdateModel } from './UpdateModel'
// import {BiEdit} from 'react-icons/bi'

import UserServices from '../../../services/userService';
let userServices = new UserServices();

class GetNotes extends Component {
    state = {
        note: [],
        showModal: false,
        show: false,
        id: null,
        title: '',
        description: '',
    }

    componentDidMount() {
        userServices.getAllNotes()
            .then((result) => {
                this.setState({ note: result.data })
                console.log("{{{{{{{{{{{{{{}}}}}}}}}}}", result.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }


    closeModal = () => {
        this.setState({ showModal: false });
    }


    // deleteNote(id) {
    //     this.setState({showModal: false});
    //     const noteId = {
    //         id: id,
    //         token: localStorage.getItem('token')
    //     }
    //     console.log(noteId)
    //     // service.delete(noteId)
    //         .then(() => {
    //             this.getUserNote()
    //         });
    // }

    render() {
        console.log(this.state.note)
        return (
            <>
                <div className='noteList'>
                    {this.state.note ? (
                        <div className='noteList2' >
                            {this.state.note.map((item) => {

                                console.log(item)
                                const id = item.id
                                const title = item.title
                                const description = item.description
                                return <div>
                                    <div className='note' onClick={() => this.setState({
                                        showModal: true,
                                        id: item.id,
                                        title: item.title,
                                        description: item.description
                                    })}>

                                        <span> {item.title}</span>
                                        <p>{item.description}</p>
                                        <div className='icons'>
                                            <NoteIcon />
                                        </div>
                                    </div>
                                </div>
                            })}
                        </div>)
                        : null}
                </div>
                <div>
                    
                </div>
            </>
        )
    }
}
export default GetNotes;