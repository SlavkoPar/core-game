import React from 'react';
import PropTypes from 'prop-types';
import BoxComponent from './BoxComponent';

const Board = ({ table, gamePhase, onClick }) => {
    const renderRow = (row, i) => {
        const columns = row.map((box, j) => (
            <BoxComponent
                key={box.key}
                box={box}
                onClick={() => onClick(i, j, gamePhase)}
            />
        ));

        return (
            <div key={i} className="board-row">
                {columns}
            </div>
        );
    };

    // const rows = table.map((row, i) => renderRow(row, i));
    const rows = [];
    const row = [];

    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((i) => {
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((j) => {
          row[j] = table[i*10+j];
        });
        rows.push(renderRow(row, i));
      });

    return (
        <div className="board">
            {rows}
        </div>
    );
};

Board.propTypes = {
    table: PropTypes.arrayOf(
                PropTypes.shape({
                    i: PropTypes.number.isRequired,
                    j: PropTypes.number.isRequired,
                    state: PropTypes.number.isRequired
                }).isRequired
    ).isRequired,

    gamePhase: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Board;
