import { createReducer } from 'redux-act';
import initialState, { mapPlayers, saveStorage } from './initialState';
import Actions from './actions';
import GamePhases from './helpers/GamePhases';
import Box, { BoxStates, ClickResults } from './helpers/Box';

function clearTheBoard(table) {
  for (let i=0; i < 10; i++) {
    for (let j=0; j < 10; j++) {
        const box = table[i*10+j];
        box.state = BoxStates.EMPTY;
    }
  }
}

const cloneState = (state) => {
  const s = { ...state };
  s.table = state.table.map(box => Object.assign({}, box));
  s.players = state.players.map(player => Object.assign({}, player));
  return s;
};

/*
 *  reducers
 */
const reducers = createReducer({

  /*
   *  generate Level
   */
  [Actions.generateLevel]: (state, payload) => {
    const { i, j } = payload;
    const startPosition = [i, j];

    const s = cloneState(state);
    const { table } = s;
    table[i*10+j].state = BoxStates.START_POSITION;

    const startBox = Box.getBox(i, j);
    startBox.generateThePath(state.level);
    const path = startBox.selectTheBestPath();

    // prepare the finding of the way
    Box.clickableBoxes = [...path];
    Box.position = [...startPosition];

    // highlight the whole path
    path.forEach((box) => {
      const [x, y] = box;
      table[x*10+y].state = BoxStates.CLICKABLE;
    });

    s.startPosition = startPosition;
    s.gamePhase = GamePhases.FINDING_THE_WAY;

    return s;
  },

  /*
   *  finding The Way
   */
  [Actions.findingTheWay]: (state, payload) => {
    const { i, j } = payload;

    const ret = Box.getBox(i, j).handleClick();
    if (ret.b) {
      const s = cloneState(state);
      const { table } = s;
      table[i*10+j].state = BoxStates.CLICKED;
      if (ret.res === ClickResults.COMPLETED_LEVEL) {
        alert('Completed, next level will have one clickable box more');
        clearTheBoard(table);
        s.level++;

        // fix global mapPlayers
        const player = mapPlayers.get(s.currentPlayerId);
        mapPlayers.set(s.currentPlayerId, { ...player, level: s.level });
        s.gamePhase = GamePhases.WAITING_FOR_FIRST_CLICK;

        // fix arrar: store.players
        s.players = [];
        mapPlayers.forEach((v, k) => {
          s.players.push(Object.assign({}, { id: k, level: v.level }));
        });

        // save storage
        saveStorage(s);
      }
      else {
        // console.log('Box.marked', Box.marked);
        Box.marked.forEach((move) => {
          const [x, y] = move;
          table[x*10+y].state = BoxStates.HIGHLIGHTED;
        });
      }
      return s;
    }

    if (ret.res === ClickResults.FAILED_TO_COMPLETE_LEVEL) {
      const s = cloneState(state);
      const { table } = s;
      alert('Failed, play again !');
      clearTheBoard(table);
      s.gamePhase = GamePhases.WAITING_FOR_FIRST_CLICK;
      return s;
    }

    return state;
  },

  /*
   *  turn of highlighting of possible moves
   */
  [Actions.turnOff]: (state) => {
    const s = cloneState(state);
    const { table } = s;
    Box.marked.forEach((move) => {
      const [i, j] = move;
      table[i*10+j].state = BoxStates.CLICKABLE;
    });
    return s;
  },

  /*
   *  clear the board
   */
  [Actions.clearTheBoard]: (state) => {
    const s = cloneState(state);
    const { table } = s;
    clearTheBoard(table);
    return s;
  }

}, initialState);

export default reducers;
