import { BoxStates } from './helpers/Box';
import GamePhases from './helpers/GamePhases';

const initialLevel = 3;

const COREGAME = 'COREGAME';

export const mapPlayers = new Map([
    ['0', { id: '0', name: 'Anonymous', level: initialLevel, password: '' }],
    ['1', { id: '1', name: 'Houdini', level: 77, password: '' }],
    ['2', { id: '2', name: 'Lang', level: 21, password: '' }],
    ['3', { id: '3', name: 'Slavko', level: 5, password: '' }],
    ['4', { id: '4', name: 'Deep Blue', level: 72, password: '' }],
    ['5', { id: '5', name: 'Mikhail', level: 11, password: '' }],
    ['6', { id: '6', name: 'Leela', level: 80, password: '' }]
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
  currentPlayerId: '0',
  disperseMode: false,
  disperseAway: true
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
  localStorage.setItem(COREGAME, JSON.stringify({
    objPlayers: strMapToObj(mapPlayers),
    currentPlayerId: s.currentPlayerId,
    level: s.level,
    disperseMode: s.disperseMode,
    disperseAway: s.disperseAway
  }));
};

// localStorage.removeItem(COREGAME);

if (isWebStorageSupported) {
  const sCoreGame = localStorage.getItem(COREGAME);
  if (sCoreGame !== null) {
    console.log('localStorage:', sCoreGame);
    const storage = JSON.parse(sCoreGame);

    mapPlayers.clear();
    Object.entries(storage.objPlayers).forEach(([key, value]) => {
      mapPlayers.set(key, value);
    });

    initialState.level = storage.level;
    initialState.players = [];
    mapPlayers.forEach((v, k) => {
      initialState.players.push(Object.assign({}, { id: k, level: v.level }));
    });

    initialState.currentPlayerId = storage.currentPlayerId.toString();
    initialState.disperseMode = storage.disperseMode;
    initialState.disperseAway = storage.disperseAway;
  }
  else {
    saveStorage(initialState);
  }
}

export default initialState;
