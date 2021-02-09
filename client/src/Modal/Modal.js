import React from 'react';

import './Modal.css'
function Modal(props) {

    const findbyKey=(name)=>
        props.children.map(child=>{
            if(child.key === name) {
                return child
            }
        })

    const closeModal= (e)=>{
        e.stopPropagation()

        if(e.target.classList.contains('modal-close')){
            return props.click()
        }
    }
    return (
        <div className="modal-backdrop modal-close" onClick={closeModal}>
            <div role="dialog" aria-labelledby="modalTitle" aria-describedby="modalContent" className="modal">
                <div className="modal-container">
                    <div className='modal-body'>
                        {findbyKey('body')}
                    </div>
                    <div className='modal-footer'>
                        {findbyKey('footer')}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;
