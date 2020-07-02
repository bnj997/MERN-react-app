import React from 'react';
import './MainHeader.css';

//props.children refers to all the content that is between the opening and closing tag of <MainHeader> and </MainHeader>
function MainHeader(props) {
  return (
    <header className="main-header">
      {props.children}
    </header>
  );
};

export default MainHeader;
