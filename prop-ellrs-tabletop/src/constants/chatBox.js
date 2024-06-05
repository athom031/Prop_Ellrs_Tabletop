import React from 'react';

const SRC = 'assets/report-screen/report-screen.png';

export const ChatBox = ({text}) => {
    return (
        <div className="chat-container">
            <img src={SRC} alt="Descriptive Text" />
            <div className="overlay-text">{text}</div>
        </div>
    )
}
