import { connect } from 'react-redux';

import GamePhases from '../helpers/GamePhases';
import Actions from '../actions';
import Board from '../components/Board';

function handleClick(i, j, gamePhase, dispatch) {
  switch (gamePhase) {
    case GamePhases.WAITING_FOR_FIRST_CLICK: {
      dispatch(Actions.generateLevel({ i, j }));
      break;
    }

    case GamePhases.GENERATING_LEVEL:
      break;

    case GamePhases.FINDING_THE_WAY:
      dispatch(Actions.findingTheWay({ i, j }));
      setTimeout(() => dispatch(Actions.turnOff()), 400);
      break;

    case GamePhases.WAITING_POPUP_RESPONSE:
      break;

    case GamePhases.WAITING_SIGN_IN_RESPONSE:
      break;

    default:
      console.log('wrong GamePhase.', gamePhase);
      break;
  }
}

const mapStateToProps = state => ({
  table: state.table,
  gamePhase: state.gamePhase // eabling usage of state-property inside of mapDispatchToProps
});

const mapDispatchToProps = dispatch => ({
  onClick: (i, j, gamePhase) => handleClick(i, j, gamePhase, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
