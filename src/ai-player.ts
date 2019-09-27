import {Board, TileState} from './board';

export class AIPlayer {
    constructor(private board: Board) {

    }

    public update() {
        if (this.board.isFull()) {
            throw new Error('Game board is full');
        }

        const len = 3;
        let c = 0;
        while (!this.board.isEmpty(c % len, ~~(c / len))) {
            c++;
        }

        this.board.addToken(c % len, ~~(c / len), TileState.X);
    }
}