
import './App.css';
import {useState, useEffect} from 'react';
import {BOARD_LENGTH, DIRECTIONS, NORTH } from './constants/directions';


function App() {
  const [characterLoc, setCharacterLoc] = useState({x: null, y: null});
  const [characterDir, setCharacterDir] = useState(DIRECTIONS[NORTH].name);
  const [playerImg, setPlayerImg] = useState(`assets/prop_ellr/directions/face_${NORTH}.png`);

  const [idle_frame, setIdleFrame] = useState(1);

  const [restartButtonHover, setRestartButtonHover] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIdleFrame(prevFrame => prevFrame === 8 ? 1 : prevFrame + 1);
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setPlayerImg(`assets/prop_ellr/directions/face_${DIRECTIONS[characterDir].name}.png`);
  }, [characterDir])

  const handleBoardClick = event => {
    const boardRect = event.target.getBoundingClientRect();
    const x = Math.floor((event.clientX - boardRect.left) / (boardRect.width / 5));
    const y = Math.floor((event.clientY - boardRect.top) / (boardRect.height / 5));

    // ASSUMPTION
    // PLACE command has robot facing north
    // UNLESS location is same as previous location
    if(x === characterLoc.x && y === characterLoc.y) {
      // do nothing
    } else {
      setCharacterLoc({x, y});
      setCharacterDir(DIRECTIONS[NORTH].name);
    }
  }

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
            onClick={handleBoardClick}
            alt="Board"
          />
          {!isDisabled() && (<img
            className='player-img'
            src={playerImg}
            style={{
              left: `${(characterLoc.x) * 18.5}%`,
              top: `${(characterLoc.y) * 20}%`,
            }}
            alt="Player"
          />)}
        </div>

        <div className="player-commands">
          <div className="player-start">
              <div className='prop-ellr-box'>
                <img
                  className='prop-ellr-holder'
                  src='assets/box/box.png'
                  alt="Box"
                />
                {isDisabled() && (
                  <img
                    className='prop-ellr-idle'
                    src={`assets/prop_ellr/idle/idle_${idle_frame}.png`}
                    alt="Prop Ellr Idle"
                  />
                )}
              </div>
              <div className='restart-button'>
                <div className='reusable-button'
                  onMouseEnter={() => setRestartButtonHover(true)}
                  onMouseLeave={() => setRestartButtonHover(false)}
                  onClick={() => window.location.reload()}
                >
                  <img
                    className='button-img'
                    src={`assets/buttons/restart/restart${restartButtonHover ? '-hover' : ''}.png`}
                    alt='Restart Button'
                  />
                  <h2>Restart</h2>
                </div>
              </div>
          </div>
        </div>

          <div className="player-controls"></div>

          <div className="player-status">

          </div>
        {/* </div> */}

      </div>
        <div>
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
        </div>
    </div>
  );
}

export default App;
