import React from 'react';

import { BOARD_LENGTH } from './directions';

const SRC = 'assets/report-screen/report-screen.png';

export const ChatBox = ({text}) => {
    return (
        <div className="chat-container">
            <img src={SRC} alt="Descriptive Text" />
            <div className="overlay-text">{text}</div>
        </div>
    )
}

export const StartingText = 'Click to place Prop Ellr'

export const ErrorText = 'Ouch! That\'s a Invalid Move'

const translateCoord = ({x, y}) => {
    const tempX = x;
    const tempY = y;

    // 0 1 2 3 4 x
    // 1
    // 2
    // 3
    // 4
    // y

    x = tempX;
    y = (BOARD_LENGTH - 1) - tempY;

    return {x, y}
}

export const PlaceText = ({x, y}) => {
    const translated = translateCoord({x, y});
    return `Placed at (${translated.x}, ${translated.y})`
}

export const ReportText = ({x,y}) => {
    const translated = translateCoord({x, y});
    return `Report: Last Seen at (${translated.x}, ${translated.y})`;
}
