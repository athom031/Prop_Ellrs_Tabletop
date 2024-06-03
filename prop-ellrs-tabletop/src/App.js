
import './App.css';

function App() {
  return (
    <div className="App">
      <h1 className='app-title'>
        Prop Ellr's TableTop Journey
      </h1>
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
