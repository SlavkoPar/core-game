import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Actions from '../actions';
import { mapPlayers } from '../initialState';
import SignInDlg from '../components/SignInDlg';
import LogInDlg from '../components/LogInDlg';
import SignOutDlg from '../components/SignOutDlg';

const GameStats = ({ level, currentPlayerId, isAnonymous,
  signInDlgOpen, onClickSignIn, toggleSignIn, onSubmitSignIn, onCancelSignIn,
  logInDlgOpen, onClickLogIn, toggleLogIn, onSubmitLogIn, onCancelLogIn,
  onSignOut }) => (
      <div className="game-stats">
          <label>User:</label> {mapPlayers.get(currentPlayerId).name}
          {' '}
          <label>Level:</label> {level}
          {isAnonymous ? (
              <Fragment>
                  <SignInDlg
                      signInDlgOpen={signInDlgOpen}
                      onClick={onClickSignIn}
                      toggle={toggleSignIn}
                      onSubmit={onSubmitSignIn}
                      onCancel={onCancelSignIn}
                  />
                  <div style={{ float: 'right' }}>&nbsp;&nbsp;</div>
                  <LogInDlg
                      logInDlgOpen={logInDlgOpen}
                      onClick={onClickLogIn}
                      toggle={toggleLogIn}
                      onSubmit={onSubmitLogIn}
                      onCancel={onCancelLogIn}
                  />
              </Fragment>
          )
          : <SignOutDlg onSignOut={onSignOut} />
          }
      </div>
);


const mapStateToProps = state => ({
  level: state.level,
  currentPlayerId: state.currentPlayerId,
  isAnonymous: state.currentPlayerId === '1',
  signInDlgOpen: state.signInDlgOpen,
  logInDlgOpen: state.logInDlgOpen
});

const mapDispatchToProps = dispatch => ({
  toggleSignIn: () => dispatch(Actions.onSignInDlgToggle()),
  onSubmitSignIn: values => dispatch(Actions.onSignInDlgSubmit(values)),

  toggleLogIn: () => dispatch(Actions.onLogInDlgToggle()),
  onSubmitLogIn: values => dispatch(Actions.onLogInDlgSubmit(values)),

  onSignOut: () => dispatch(Actions.onSignOut())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameStats);

GameStats.propTypes = {
  level: PropTypes.number.isRequired,
  currentPlayerId: PropTypes.string.isRequired,
  isAnonymous: PropTypes.bool.isRequired,

  signInDlgOpen: PropTypes.bool.isRequired,
  toggleSignIn: PropTypes.func.isRequired,
  onSubmitSignIn: PropTypes.func.isRequired,

  logInDlgOpen: PropTypes.bool.isRequired,
  toggleLogIn: PropTypes.func.isRequired,
  onSubmitLogIn: PropTypes.func.isRequired,

  onSignOut: PropTypes.func.isRequired
};
