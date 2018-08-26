import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { mapPlayers } from '../initialState';

const Players = ({ dispatch, players }) => {
  const playersSorted = [...players].sort((x, y) => y.level - x.level).map(player => (
      <li key={player.id}>
          {mapPlayers.get(player.id).name} ({player.level})
      </li>
  ));

  return (
      <div style={{ fontSize: '14px' }}>
          <h3>Players</h3>
          <ul>
              {playersSorted}
          </ul>
      </div>
  );
};

function handleClick(dispatch) {
}

const mapStateToProps = state => ({
  players: state.players
});

const mapDispatchToProps = dispatch => ({
  onClick: () => handleClick(dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Players);

Players.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      level: PropTypes.number.isRequired
    }).isRequired
  ).isRequired
};
