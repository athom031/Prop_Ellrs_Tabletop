
import './App.css';
import {useState, useEffect} from 'react';
import {BOARD_LENGTH, DIRECTIONS, NORTH } from './constants/directions';


function App() {
  const [characterLoc, setCharacterLoc] = useState({x: null, y: null});
  const [characterDir, setCharacterDir] = useState(DIRECTIONS[NORTH].name);
  const [playerImg, setPlayerImg] = useState(`assets/prop_ellr/directions/face_${NORTH}.png`);

  const [idle_frame, setIdleFrame] = useState(1);

  const [restartButtonHover, setRestartButtonHover] = useState(false);
  const [spacebarButtonHover, setSpacebarButtonHover] = useState(false);
  const [leftButtonHover, setLeftButtonHover] = useState(false);
  const [rightButtonHover, setRightButtonHover] = useState(false);

  // useEffect(() => {
  //   // Function to handle key events
  //   const handleKeyEvent = (event) => {
  //     switch (event.code) {
  //       case 'Space':
  //         if (event.type === 'keydown') {
  //           console.log('Spacebar pressed down');
  //           // Logic for spacebar keydown
  //         } else {
  //           console.log('Spacebar released');
  //           // Logic for spacebar keyup
  //         }
  //         break;
  //       case 'ArrowLeft':
  //         if (event.type === 'keydown') {
  //           console.log('Left arrow pressed');
  //           // Logic for left arrow keydown
  //         }
  //         break;
  //       case 'ArrowRight':
  //         if (event.type === 'keydown') {
  //           console.log('Right arrow pressed');
  //           // Logic for right arrow keydown
  //         }
  //         break;
  //       default:
  //         break;
  //     }
  //   };
  //   // Add event listeners for both keydown and keyup events
  //   window.addEventListener('keydown', handleKeyEvent);
  //   window.addEventListener('keyup', handleKeyEvent);
  //   // Cleanup function to remove the event listeners
  //   return () => {
  //     window.removeEventListener('keydown', handleKeyEvent);
  //     window.removeEventListener('keyup', handleKeyEvent);
  //   };
  // }, []); // Empty dependency array means this effect runs only once after the initial render

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIdleFrame(prevFrame => prevFrame === 8 ? 1 : prevFrame + 1);
    }, 100);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setPlayerImg(`assets/prop_ellr/directions/face_${DIRECTIONS[characterDir].name}.png`);
    console.log(`prop ellr now facing ${DIRECTIONS[characterDir].name}`)
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
      console.log('do nothing because same location');
    } else {
      setCharacterLoc({x, y});
      setCharacterDir(DIRECTIONS[NORTH].name);
      console.log(`prop ellr placed at ${x},${y} (relative to grid)`);
    }
  }

  const move = () => {
    const {x, y} = characterLoc;
    const [potX, potY] = [x + DIRECTIONS[characterDir].xStep, y + DIRECTIONS[characterDir].yStep];

    if(potX < 0 || potX >= BOARD_LENGTH || potY < 0 || potY >= BOARD_LENGTH) {
      // show error for attempting to move off table
      console.log('invalid move');
      let error_frame = 1;
      const showErrorFrame = () => {
        if (error_frame <= 7) {
          setPlayerImg(`assets/prop_ellr/error/error_${error_frame}.png`);
          error_frame++;
          setTimeout(showErrorFrame, 1000 / 7);
        } else {
          setPlayerImg(`assets/prop_ellr/directions/face_${characterDir}.png`);
        }
      };
      showErrorFrame();
    } else {
      setCharacterLoc({x: potX, y: potY});
      console.log(`prop ellr moved to ${potX},${potY} (relative to grid)`);
    }
  }

  const faceLeft = () => setCharacterDir(DIRECTIONS[characterDir].left);

  const faceRight = () => setCharacterDir(DIRECTIONS[characterDir].right);

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
            // not sure why 18.5 for the width -> hacked number
            alt="Player"
          />)}
        </div>

        <div className="player-commands">
          {/* first row of commands: prop ellrs idle location and restart button */}
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

          {/* second row of commands: chat box showing status and report button */}
          <div className="player-status">

          </div>

          {/* third row of commands: player controls (space, left, right) */}
          <div className="player-controls">
            <div className='spacebar-button'>
              <div className='reusable-button'
                  onMouseEnter={() => setSpacebarButtonHover(!isDisabled() && true)}
                  onMouseLeave={() => setSpacebarButtonHover(false)}
                  disabled={isDisabled()}
                  onClick={() => move()}
              >
                  <img
                    className='button-img'
                    src={`assets/buttons/spacebar/spacebar${spacebarButtonHover ? '-hover' : ''}.png`}
                    alt='Spacebar Button'
                  />
                  <h2>Move Prop Ellr (Spacebar)</h2>
              </div>
            </div>

            <div className='left-button'>
              <div className='reusable-button'
                  onMouseEnter={() => setLeftButtonHover(!isDisabled() && true)}
                  onMouseLeave={() => setLeftButtonHover(false)}
                  disabled={isDisabled()}
                  onClick={() => faceLeft()}
              >
                  <img
                    className='button-img'
                    src={`assets/buttons/arrow-left/arrow-left${leftButtonHover ? '-hover' : ''}.png`}
                    alt='Left Arrow Button'
                  />
                  <h2>Face Left ({'<-'} Key)</h2>
              </div>
          </div>

          <div className='right-button'>
              <div className='reusable-button'
                  onMouseEnter={() => setRightButtonHover(!isDisabled() && true)}
                  onMouseLeave={() => setRightButtonHover(false)}
                  disabled={isDisabled()}
                  onClick={() => faceRight()}
              >
                  <img
                    className='button-img'
                    src={`assets/buttons/arrow-right/arrow-right${rightButtonHover ? '-hover' : ''}.png`}
                    alt='Right Arrow Button'
                  />
                  <h2>Face Right ({'->'} Key)</h2>
              </div>
          </div>

        </div>
      </div>
    </div>

    </div>
  );
}

export default App;
