import React from 'react';
import './App.css';

import Game from '../containers/Game';
import GameStats from '../containers/GameStats';
import Players from '../containers/Players';

const App = () => (

    <div className="App">

        <header className="App-header">
            <h3 className="App-title">Core Game</h3>
            <GameStats />
        </header>

        <div className="game" style={{ margin: 10 }}>
            <div className="game-board">
                <Game />
            </div>
            <div className="game-info">
                <Players />
            </div>
        </div>

    </div>
);

export default App;
