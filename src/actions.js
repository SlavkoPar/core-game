import { createAction } from 'redux-act';

// Create an action creator (description is optional)
const Actions = {
  generateLevel: createAction('generate Level'),
  findingTheWay: createAction('finding The Way'),
  turnOff: createAction('turn off possible moves'),
  clearTheBoard: createAction('clear The Board'),
  togglePopover: createAction('toggle Popover'),
  onPopover: createAction('on Popover')
};

export default Actions;
