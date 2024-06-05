
import './App.css';
import {useState, useEffect, useCallback} from 'react';
import {BOARD_LENGTH, DIRECTIONS, NORTH } from './constants/directions';
import { ChatBox, StartingText, ErrorText, PlaceText, ReportText } from './constants/chatBox';
import ReusableButton from './constants/reusableButton';

function App() {
  const [characterLoc, setCharacterLoc] = useState({x: null, y: null});
  const [characterDir, setCharacterDir] = useState(DIRECTIONS[NORTH].name);
  const [playerImg, setPlayerImg] = useState(`assets/prop_ellr/directions/face_${NORTH}.png`);
  const [idle_frame, setIdleFrame] = useState(1);
  const [restartButtonHover, setRestartButtonHover] = useState(false);
  const [reportButtonHover, setReportButtonHover] = useState(false);
  const [spacebarButtonHover, setSpacebarButtonHover] = useState(false);
  const [leftButtonHover, setLeftButtonHover] = useState(false);
  const [rightButtonHover, setRightButtonHover] = useState(false);
  const [chatBoxText, setChatBoxText] = useState(StartingText);

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
      setChatBoxText(PlaceText({x, y}));
    }
  }

  const report = () => setChatBoxText(ReportText(characterLoc));

  const isDisabled = useCallback(() => characterLoc.x === null || characterLoc.y === null, [characterLoc]);

  const move = useCallback(() => {
    if(isDisabled()) return;

    const {x, y} = characterLoc;
    const [potX, potY] = [x + DIRECTIONS[characterDir].xStep, y + DIRECTIONS[characterDir].yStep];

    if(potX < 0 || potX >= BOARD_LENGTH || potY < 0 || potY >= BOARD_LENGTH) {
      // show error for attempting to move off table
      console.log('invalid move');
      let error_frame = 1;
      const prevChatBoxText = chatBoxText;
      setChatBoxText(ErrorText);
      const showErrorFrame = () => {
        if (error_frame <= 7) {
          setPlayerImg(`assets/prop_ellr/error/error_${error_frame}.png`);
          error_frame++;
          setTimeout(showErrorFrame, 1000 / 7);
        } else {
          setPlayerImg(`assets/prop_ellr/directions/face_${characterDir}.png`);
          setChatBoxText(prevChatBoxText);
        }
      };
      showErrorFrame();
    } else {
      setCharacterLoc({x: potX, y: potY});
    }
  }, [characterLoc, characterDir, chatBoxText]);

  const faceLeft = useCallback(() => isDisabled() ? null : setCharacterDir(DIRECTIONS[characterDir].left), [characterDir]);

  const faceRight = useCallback(() => isDisabled() ? null : setCharacterDir(DIRECTIONS[characterDir].right), [characterDir]);


  useEffect(() => {
    // we need some key event listeners for the spacebar and arrow keys
    const handleKeyEvent = (event) => {
      switch (event.code) {
        case 'Space':
          if (event.type === 'keydown') {
            event.preventDefault();
            console.log('Spacebar pressed down');
            setSpacebarButtonHover(!isDisabled() && true);
          } else {
            console.log('Spacebar released');
            setSpacebarButtonHover(false);
            move();
          }
          break;
        case 'ArrowLeft':
          if (event.type === 'keydown') {
            event.preventDefault();
            console.log('Left arrow pressed');
            setLeftButtonHover(!isDisabled() && true);
          } else {
            console.log('Left arrow released');
            setLeftButtonHover(false);
            faceLeft();
          }
          break;
        case 'ArrowRight':
          if(event.type === 'keydown') {
            event.preventDefault();
            console.log('Right arrow pressed');
            setRightButtonHover(!isDisabled() && true);
          } else {
            console.log('Right arrow released');
            setRightButtonHover(false);
            faceRight();
          }
          break;
        default:
          break;
      }
    };

    // add event listener for keydown and keyup events
    window.addEventListener('keydown', handleKeyEvent);
    window.addEventListener('keyup', handleKeyEvent);

    // remove event listener for cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyEvent);
      window.removeEventListener('keyup', handleKeyEvent);
    };

  }, [isDisabled, move, faceLeft, faceRight]);

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
                <ReusableButton
                  hover={restartButtonHover}
                  setHover={setRestartButtonHover}
                  disabled={isDisabled()}
                  onClick={() => window.location.reload()}
                  imgPrefix='assets/buttons/restart/restart'
                  altText='Restart Button'
                  label='Restart'
                />
              </div>
          </div>

          {/* second row of commands: chat box showing status and report button */}
          <div className="player-status">
            <ChatBox text={chatBoxText}/>
            <div className='report-button'>
              <ReusableButton
                hover={reportButtonHover}
                setHover={setReportButtonHover}
                disabled={isDisabled()}
                onClick={() => report()}
                imgPrefix='assets/buttons/report/report'
                altText='Report Button'
                label='Report'
              />
            </div>
          </div>

          {/* third row of commands: player controls (space, left, right) */}
          <div className="player-controls">
            <div className='spacebar-button'>
              <ReusableButton
                hover={spacebarButtonHover}
                setHover={setSpacebarButtonHover}
                disabled={isDisabled()}
                onClick={() => move()}
                imgPrefix='assets/buttons/spacebar/spacebar'
                altText='Spacebar Button'
                label='Move'
              />
            </div>

            <div className='left-button'>
              <ReusableButton
                hover={leftButtonHover}
                setHover={setLeftButtonHover}
                disabled={isDisabled()}
                onClick={() => faceLeft()}
                imgPrefix='assets/buttons/arrow-left/arrow-left'
                altText='Left Arrow Button'
                label='Left'
              />
          </div>

          <div className='right-button'>
            <ReusableButton
              hover={rightButtonHover}
              setHover={setRightButtonHover}
              disabled={isDisabled()}
              onClick={() => faceRight()}
              imgPrefix='assets/buttons/arrow-right/arrow-right'
              altText='Right Arrow Button'
              label='Right'
            />
          </div>

        </div>
      </div>
    </div>

    </div>
  );
}

export default App;
