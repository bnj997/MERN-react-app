import React from 'react';
import ReactDOM from 'react-dom';
import {CSSTransition} from 'react-transition-group';


import './SideDrawer.css';

function SideDrawer(props) {
  const content = (
    <CSSTransition
      //"in" keyword dictates whether the sidedrawer shouyld show or not. true is to show and false not to show
      in={props.show}
      timeout={200}
      //These classnames are defined in index.css which this 3rd parrt CSStransition module knows how to use
      classNames="slide-in-left"
      //Tells 3nd party module to either be added to DOM or completely removed from DOM - not just hidden
      mountOnEnter
      unmountOnExit
    >
      <aside className="side-drawer" onClick={props.onClick}>{props.children}</aside>
    </CSSTransition>
  )
  //this just ensures that when index.html loads, the sidedrawer html is loaded iun a better spot (above the 'root' where the main code is loaded)
  return ReactDOM.createPortal(content, document.getElementById('drawer-hook'));
}

export default SideDrawer;
