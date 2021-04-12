// import React from 'react';
// import { Component } from 'react';
// import { Modal } from 'react-bootstrap'

// class UpdateNote extends Component {
//     render() {
//         return (
//             <div>
//                 <Modal
//                     show={this.state.show}
//                     className="model-lg"
//                     size="lg"
//                     aria-labelledby="contained-modal-title-vcenter"
//                     centered>
//                     <Modal.Body className='updateNote'>
//                         <div className="update_box">
//                             <input className='title'
//                                 defaultValue={this.state.titileForUpdate}
//                                 onChange={(e) => this.handleUpdateChange("title", e.target.value)}
//                             />
//                             <textarea className='description'
//                                 defaultValue={this.state.descriptionForUpdate}
//                                 onChange={(e) => this.handleUpdateChange("description", e.target.value)}
//                             />
//                         </div>
//                         <div className="icon_closebtn">
//                             <div className="icons">
//                                 <NoteIcon />
//                             </div>
//                             <div className="close_btn">
//                                 <button className='model-close' onClick={(e) => this.handleUpdateSubmit(e)}>Close</button>
//                             </div>
//                         </div>
//                     </Modal.Body>
//                 </Modal>
//             </div>
//         )
//     }
// }
// export default UpdateNote;