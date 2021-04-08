import React, {Component} from 'react'
import {Modal, Button} from 'react-bootstrap'
import '../styles/updateModel.scss'
import service from '../services/note'
import Icons from './CardIcon'
import '../styles/getNote.scss'

export class UpdateModel extends Component {
    constructor(props) {
        console.log("I am in Props", props);
        super(props);
        this.state = {
            id: null,
            title: '',
            description: ''
        }
    }

    update(nextProps) {
        this.setState({
            title: nextProps.title,
            description: nextProps.description,
        });
    }

    componentWillReceiveProps(nextProps) {
        this.update(nextProps)
    }

    titleHandler(e) {
        this.setState({title: e.target.value});
    }

    descriptionHandler(e) {
        this.setState({description: e.target.value});
    }

    handleSave = () => {
        var updateNote = {id: this.props.id, title: this.state.title, description: this.state.description, token: localStorage.getItem('token')};
        console.log(updateNote)
        service.update(updateNote)
            .then(() => {
                this.setState(this.props.close);
                window.location.reload();
            });
    }

    render() {
        return (
            <>
                <Modal
                    show={this.props.show}
                    className="model-lg"
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='updateNote'>
                        <input className='title'
                            value={this.state.title}
                            onChange={(e) => this.titleHandler(e)}
                        />
                        <textarea className='description'
                            value={this.state.description}
                            onChange={(e) => this.descriptionHandler(e)}
                        />
                            <Button className='model-close' onClick={this.props.close}>Close</Button>
                            <Button className='model-close' type="submit" onClick={this.handleSave}>
                                Save
                            </Button>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}