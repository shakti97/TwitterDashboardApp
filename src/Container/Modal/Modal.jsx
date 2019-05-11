import React from "react";
import "./Modal.css";



const Modal = ({ handleClose, show, children, modalTitle}) => {
  return (
    <div className={show ? "modal display-block" : "modal display-none"}>
        <div className="Modal-main">
            <div className="modal-header">
                <h4 className="modal-title">{modalTitle}</h4>
                <button type="button" className='close' onClick={handleClose}>&times;</button>
            </div>
            <div className="modal-body">
                {children}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" onClick={handleClose}>
                Close
                </button>
            </div>
        </div>
    </div>
  );
};
export default Modal;
