import {Board} from './board';
import {AIPlayer} from './ai-player';
import {WebGLResource} from 'mallet-dev';

export class TicTacToe extends WebGLResource {
    private readonly board: Board;
    private aiPlayer: AIPlayer;

    constructor() {
        super();
        this.board = this.context.factory.create(Board);
        this.aiPlayer = new AIPlayer(this.board);
    }

    release(): void {
        // no-op
    }
}