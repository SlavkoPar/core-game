import { createAction } from 'redux-act';

// Create an action creator (description is optional)
const Actions = {
  generateLevel: createAction('generate Level'),
  findingTheWay: createAction('finding The Way'),
  turnOff: createAction('turn off possible moves'),
  clearTheBoard: createAction('clear The Board'),

  togglePopover: createAction('toggle Popover'),
  onPopover: createAction('on Popover'),

  onSignInDlgToggle: createAction('on SignIn Dlg Toggle'),
  onSignInDlgSubmit: createAction('on SignIn Dlg Submit'),

  onLogInDlgToggle: createAction('on LogIn Dlg Toggle'),
  onLogInDlgSubmit: createAction('on LogIn Dlg Submit'),

  onSignOut: createAction('on Sign Out')
};

export default Actions;
