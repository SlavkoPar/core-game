import { createAction } from 'redux-act';

// Create an action creator (description is optional)
const Actions = {
  generateLevel: createAction('generate Level'),
  findingTheWay: createAction('finding The Way'),
  turnOff: createAction('turn off possible moves'),
  clearTheBoard: createAction('clear The Board'),

  togglePopover: createAction('toggle Popover'),
  onPopover: createAction('on Popover'),

  openSignInDlg: createAction('open SignIn Dlg'),
  onSignInDlgToggle: createAction('on SignIn Dlg Toggle'),
  onSignInDlgSave: createAction('on SignIn Dlg Save'),
  onSignInDlgCancel: createAction('on SignIn Dlg Cancel'),
  onSignInDlgSubmit: createAction('on SignIn Dlg Submit')

};

export default Actions;
