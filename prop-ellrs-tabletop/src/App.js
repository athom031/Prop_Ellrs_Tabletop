
import './App.css';
import {useState} from 'react';
import {dirs, EAST, NORTH, SOUTH, WEST} from './constants/dirs';


function App() {
  const [characterLoc, setCharacterLoc] = useState({x: null, y: null});
  const [characterDir, setCharacterDir] = useState(dirs[NORTH].name);

  const move = () => {
    const {x, y} = characterLoc;
    console.log(x, y);
    console.log(dirs[characterDir].xStep, dirs[characterDir].yStep);
    const [potX, potY] = [x + dirs[characterDir].xStep, y + dirs[characterDir].yStep];

    if(potX < 0 || potX >= 5 || potY < 0 || potY >= 5) {
      // do nothing because taking this step would go out of bounds
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

      <button disabled={isDisabled()} onClick={() => setCharacterDir(dirs[characterDir].left)}>
        Face Left
      </button>

      <br/>

      <button disabled={isDisabled()} onClick={() => setCharacterDir(dirs[characterDir].right)}>
        Face Right
      </button>

      <br/>


      <div className="app-content">
        <div clsasName="board">

        </div>
        <div className="player-commands">
          <div className="player-start">
              <div className='prop-ellr-box'>

              </div>
              <div className='reset'>
                <button onClick={() => window.location.reload()}>Reset</button>
              </div>
          </div>
          <div className="player-controls">

          </div>
          <div className="player-status">

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
