
import './App.css';
import {useState} from 'react';
import {BOARD_LENGTH, DIRECTIONS, NORTH } from './constants/directions';


function App() {
  const [characterLoc, setCharacterLoc] = useState({x: null, y: null});
  const [characterDir, setCharacterDir] = useState(DIRECTIONS[NORTH].name);
  const [playerImg, setPlayerImg] = useState('');

  const move = () => {
    const {x, y} = characterLoc;
    console.log(x, y);
    console.log(DIRECTIONS[characterDir].xStep, DIRECTIONS[characterDir].yStep);
    const [potX, potY] = [x + DIRECTIONS[characterDir].xStep, y + DIRECTIONS[characterDir].yStep];

    if(potX < 0 || potX >= BOARD_LENGTH || potY < 0 || potY >= BOARD_LENGTH) {
      // do nothing because taking this step would go out of bounds
      // maybe show a highlighted red or something like that
      // to show that this is not a valid move
    } else {
      setCharacterLoc({x: potX, y: potY});
    }
  }

  const isDisabled = () => characterLoc.x === null || characterLoc.y === null;

  return (
    <div className="App">
      <h1 className='app-title'>
        Prop Ellr's TableTop Journey
      </h1>

      <div className="app-content">
        <div className="board">
          <img
            className='board-img'
            src='assets/board/board.png'
            onClick={(event) => console.log(event)}
            alt="Board"
          />
          <img
            className='player-img'
            src='assets/prop_ellr/face_left.png'
            alt="Prop Ellr"
          />
        </div>

        <div className="player-commands">

          {characterLoc.x ?? 'Not Set'}
          <br/>
          {characterLoc.y ?? 'Not Set'}
          <br/>
          {characterDir}

          <br/>
          <br/>

          <button onClick={() => setCharacterLoc({x: 0, y: 0})}>
            Start Game
          </button>

          <br/>

          <button disabled={isDisabled()} onClick={() => move()}>
            Move in Direction
          </button>

          <br/>

          <button disabled={isDisabled()} onClick={() => setCharacterDir(DIRECTIONS[characterDir].left)}>
            Face Left
          </button>

          <br/>

          <button disabled={isDisabled()} onClick={() => setCharacterDir(DIRECTIONS[characterDir].right)}>
            Face Right
          </button>

          <br/>

          <div className="player-start">
              <div className='prop-ellr-box'>

              </div>
              <div className='reset'>
                <button onClick={() => window.location.reload()}>Reset</button>
              </div>
          </div>

          <div className="player-controls"></div>

          <div className="player-status">

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
