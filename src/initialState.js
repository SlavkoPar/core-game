import { BoxStates } from './helpers/Box';
import GamePhases from './helpers/GamePhases';

export const initialLevel = 3;

const CORE_GAME = 'CORE_GAME';

export const mapPlayers = new Map([
    ['1', { id: '1', name: 'Anonymous', level: initialLevel, password: '' }]
]);


const getTable = () => {
  const table = [];
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((i) => {
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((j) => {
      table.push({ i, j, key: i * 10 + j, state: BoxStates.EMPTY });
    });
  });
  return table;
};

const initialState = {
  table: getTable(),
  gamePhase: GamePhases.WAITING_FOR_FIRST_CLICK,
  startPosition: [],
  level: initialLevel,
  players: [],
  currentPlayerId: '1',
  disperseMode: false,
  disperseAway: true,
  popoverOpen: false,
  popoverCompleted: true,
  signInDlgOpen: false,
  logInDlgOpen: false
};


function strMapToObj(strMap) {
  const obj = {};
  strMap.forEach((v, k) => {
      obj[k] = v;
  });
  return obj;
}

function isWebStorageSupported() {
  return 'localStorage' in window
}

export const saveStorage = (s) => {
  localStorage.setItem(CORE_GAME, JSON.stringify({
    objPlayers: strMapToObj(mapPlayers),
    currentPlayerId: s.currentPlayerId,
    level: s.level,
    disperseMode: s.disperseMode,
    disperseAway: s.disperseAway
  }));
};

// localStorage.removeItem(CORE_GAME);

if (isWebStorageSupported) {
  const sCoreGame = localStorage.getItem(CORE_GAME);
  if (sCoreGame !== null) {
    console.log('localStorage:', sCoreGame);
    const storage = JSON.parse(sCoreGame);

    mapPlayers.clear();
    Object.entries(storage.objPlayers).forEach(([key, value]) => {
      mapPlayers.set(key, value);
    });

    initialState.level = storage.level;

    initialState.currentPlayerId = storage.currentPlayerId.toString();
    initialState.disperseMode = storage.disperseMode;
    initialState.disperseAway = storage.disperseAway;
  }
}

mapPlayers.forEach((v, k) => {
  initialState.players.push(Object.assign({}, { id: k, level: v.level }));
});


export default initialState;
