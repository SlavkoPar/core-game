import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const GameStats = ({ dispatch, level }) => (
    <div>
        {/* <form onSubmit={e => {
          e.preventDefault()
          if (!input.value.trim()) {
            return
          }
          dispatch(addTodo(input.value))
          input.value = ''
        }}>
          <input ref={node => input = node} />
          <button type="submit">
            Add Todo
          </button>
        </form> */}
      Level: {level}
    </div>
);

function handleClick(dispatch) {
}

const mapStateToProps = state => ({
  level: state.level
});

const mapDispatchToProps = dispatch => ({
  onClick: () => handleClick(dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameStats);

GameStats.propTypes = {
  level: PropTypes.number.isRequired
};
