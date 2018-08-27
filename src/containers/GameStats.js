import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Actions from '../actions';
import SignInDlg from '../components/SignInDlg';

const GameStats = ({ level, signInDlgOpen, onClick, toggle, onSubmit, onCancel }) => (
    <div>
        Level: {level}
        <SignInDlg
            signInDlgOpen={signInDlgOpen}
            onClick={onClick}
            toggle={toggle}
            onSubmit={onSubmit}
            onCancel={onCancel}
        />
    </div>
);


const mapStateToProps = state => ({
  level: state.level,
  signInDlgOpen: state.signInDlgOpen
});

const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch(Actions.openSignInDlg()),
  toggle: () => dispatch(Actions.onSignInDlgToggle()),
  onSubmit: () => dispatch(Actions.onSignInDlgSubmit()),
  onCancel: () => dispatch(Actions.onSignInDlgCancel())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameStats);

GameStats.propTypes = {
  level: PropTypes.number.isRequired,
  signInDlgOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};
