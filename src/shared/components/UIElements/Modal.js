import React from 'react'
import ReactDOM from 'react-dom';
import {CSSTransition} from 'react-transition-group';

import Backdrop from './Backdrop'
import './Modal.css';

function ModalOverlay(props) {
  const content = (
    //Can add another class name in addition to the modal class name in form of props.className
    <div className={`modal ${props.className}`} style={props.style}>
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        //want to make sure if we render buttons inside form that do not submit, dont reload page by triggering form submission
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }>

        <div className={`modal__content ${props.contentClass}`}>
          {props.children}
        </div>

        <footer className={`modal__footer ${props.footertClass}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  )
  return ReactDOM.createPortal(content, document.getElementById('modal-hook'))
}


//{...props} Takes the props passed to Modal and forwards them to ModalOverly which is NOT exported
function Modal(props) {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal
