import randomSeed from './random';

/*
 * BoxStates
 */
export const BoxStates = {
    EMPTY: 0,
    START_POSITION: 1,
    CLICKABLE: 2,
    CLICKED: 3,
    HIGHLIGHTED: 4
};

export const ClickResults = {
    UNDEFINED: 0,
    COMPLETED_LEVEL: 1,
    FAILED_TO_COMPLETE_LEVEL: 2
};

/*
 * 'Box' class enables usage of predefined clickable Boxes for each Box,
 * which speeds up level generation.
 * Method 'generatePath' recursive jumps over the Store Boxes, which spares the memory allocated.
 */

export default class Box {

    constructor(i, j, state=BoxStates.EMPTY) {
        this.i = i;
        this.j = j;
        this.key = i * 10 + j;
        this.state = state;
        this.possibleMoves = this.getPossibleMoves(i, j);
    }

    generateThePath = (levelNumber) => {
        Box.startPosition = [this.i, this.j];
        Box.levelNumber = levelNumber;
        Box.path = Array(levelNumber).fill(null);
        Box.pathTheBest = [];
        Box.maxNumberOfWrongWays = -1;
        Box.iPath = 0;

        this.generatePath(levelNumber);
    }

    selectTheBestPath = () => {
        // get first for the time being
        // we should select the path which has biggest number of wrong ways
        console.log('Box.iPath:', Box.iPath);
        const path = Box.pathTheBest.map(move => [Math.floor(move/10), move%10]);
        return path;
    }

    findOutTheNumberOfWrongWays = () => (
        // use Box.path
        0
    );

    // consider getter, or usage of yield
    generatePath = (n) => {
        if (n === 0) {
            const numberOfWrongWays = this.findOutTheNumberOfWrongWays();
            if (numberOfWrongWays > Box.maxNumberOfWrongWays) {
                Box.maxNumberOfWrongWays = numberOfWrongWays;
                Box.pathTheBest = [...Box.path];
            }
            Box.iPath++;
            return 1;
        }

        let bRet = 0;
        const { levelNumber } = Box;
        const len = Box.path.length;
        const moves = this.getMoves();
        let randomIndexes = [];
        if (!Box.disperseMode) {
            randomIndexes = this.randomizeMoves(moves);
        }

        for (let k=0; k < moves.length; k++) {
            const index = Box.disperseMode ? k : randomIndexes[k];
            const move = moves[index];
            const [x, y] = move;
            for (let p=levelNumber-n; p < len; p++) {
                Box.path[p] = null;
            }
            Box.path[levelNumber-n] = x*10+y; // [x, y];
            bRet = Box.getBox(x, y).generatePath(n-1);
            if (bRet === 1) {
                break;
            }
        }

        return bRet;
    }

    randomizeMoves = (moves) => {
        const len = moves.length;
        const indexes = [];
        while (indexes.length !== len) {
            const i = Math.floor(Box.random() * 10);
            if (i < len && !indexes.includes(i)) {
                indexes.push(i);
            }
        }
        return indexes;
    };

    getMoves = () => {
        const i = Box.startPosition[0];
        const j = Box.startPosition[1];
        return this.possibleMoves.filter((move) => {
                const [x, y] = move;
                return !(i===x && j===y) && !Box.path.includes(x*10 + y);
                // table[x][y].state !== 0 &&
                });
    }

    /*
     *  Finding the way to click on all the boxes (in the path)
     */
    handleClick = () => {
        const { i, j } = this;
        if (this.satisfyRulesOfMovements(i, j)) {
            Box.position = [i, j];
            Box.getBox(i, j).markPossiblePathBoxes();
            const { clickableBoxes } = Box;
            // remove box from clickableBoxes
            clickableBoxes.splice(clickableBoxes.findIndex(m => m[0] === i && m[1] === j), 1);
            if (clickableBoxes.length === 0) {
                return { b: true, res: ClickResults.COMPLETED_LEVEL };
            }
            else {
                // we have more clickable boxes
                if (!this.hasAtLeastOneClickableBox(i, j)) {
                    return { b: false, res: ClickResults.FAILED_TO_COMPLETE_LEVEL };
                }
                return { b: true, res: ClickResults.undefined };
            }
        }
        return { b: false, res: ClickResults.undefined };
    }

    satisfyRulesOfMovements = (x, y) => {
        const [i, j] = Box.position;
        const moves = this.getPossibleMoves(i, j);

        const { clickableBoxes } = Box;
        return moves.findIndex(m => m[0] === x && m[1] === y) !== -1
                && clickableBoxes.findIndex(m => m[0] === x && m[1] === y) !== -1;
    }

    markPossiblePathBoxes = () => {
        const { clickableBoxes } = Box;
        Box.marked = this.possibleMoves.filter((move) => {
            const [i, j] = move;
            return clickableBoxes.findIndex(m => m !== null && m[0] === i && m[1] === j) !== -1;
       });
    }

    hasAtLeastOneClickableBox = () => {
        const { clickableBoxes } = Box;
        const arr = this.possibleMoves.filter((move) => {
            const [i, j] = move;
            return clickableBoxes.findIndex(m => m !== null && m[0] === i && m[1] === j) !== -1;
        });
        return arr.length > 0;
    }

}

Box.prototype.getPossibleMoves = (i, j) => {
    const moves = [
        [i-3, j],
        [i-2, j+2],
        [i, j+3],
        [i+2, j+2],
        [i+3, j],
        [i+2, j-2],
        [i, j-3],
        [i-2, j-2]
    ];

    return moves.filter((move) => {
        const [x, y] = move;
        return x >= 0 && x <= 9 && y >= 0 && y <= 9;
    });
};

Box.levelNumber = undefined;
Box.startPosition = [];
Box.path = [];
Box.pathTheBest = [];
Box.maxNumberOfWrongWays = -1;
Box.iPath = 0;
Box.random = randomSeed(329972281);
Box.marked = []; // highlight possible boxes

Box.table = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(j => (
      new Box(i, j)))
));

Box.getBox = (i, j) => (
    Box.table[i][j]
);
