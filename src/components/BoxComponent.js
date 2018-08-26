import React from 'react';
import PropTypes from 'prop-types';
import { BoxStates } from '../helpers/Box';

const BoxComponent = ({ box, onClick }) => {
    const { i, j, state } = box;
    let backgroundColor = '';
    switch (state) {
        case BoxStates.EMPTY:
            backgroundColor = 'transparent';
            break;
        case BoxStates.START_POSITION:
            backgroundColor = 'lightgreen';
            break;
        case BoxStates.CLICKABLE:
            backgroundColor = 'teal';
            break;
        case BoxStates.HIGHLIGHTED:
            backgroundColor = 'greenyellow';
            break;
        case BoxStates.CLICKED:
            backgroundColor = 'lightgreen';
            break;
        default:
            backgroundColor = 'transparent';
    }

    return (
        <div className="box" onClick={() => onClick(i, j)} role="presentation" id="Popover1">
            <div className="inner" style={{ backgroundColor }}>
                {/* {i}, {j} */}
            </div>
        </div>
    );
};

BoxComponent.propTypes = {
    box: PropTypes.shape({
        i: PropTypes.number,
        j: PropTypes.number,
        state: PropTypes.number
    }).isRequired,
    onClick: PropTypes.func.isRequired
};

export default BoxComponent;
