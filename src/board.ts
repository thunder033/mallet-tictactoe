import {Entity} from 'mallet-dev';

export enum TileState {
    Empty,
    O,
    X,
}

enum TileAnimation {
    Idle,
    Marked,
    Win,
}

interface ITileOpts {
    x: number,
    y: number,
}

class Tile extends Entity {
    private state: TileState;
    private animState: TileAnimation;

    private x: number;
    private y: number;

    constructor({x, y}: ITileOpts) {
        super({meshName: 'cube', materialName: 'white'});
        this.state = TileState.Empty;

        this.x = x;
        this.y = y;
        this.transform.translate(x * 1.1, y * 1.1, -5);
    }

    public mark(player: TileState) {
        this.state = player;
    }

    public update(dt: number, tt: number): void {
        switch(this.animState) {
            case TileAnimation.Idle: break;
            case TileAnimation.Marked: break;
            case TileAnimation.Win: break;
        }
    }

    public getState(): TileState {
        return this.state;
    }
}


export class Board extends Entity {

    private readonly tiles: Tile[][]; // y by x

    constructor() {
        super({meshName: 'cube', materialName: 'white'});
        this.tiles = new Array(3);

        const createTile = (x, y) => this.context.factory.create(Tile, {x, y});
        for (let i = 0; i < 3; i++) {
            this.tiles[i] = [
                createTile(0, i),
                createTile(1, i),
                createTile(2, i)];
        }
    }

    public update(dt: number, tt: number): void {
        this.transform.setPosition(.25, -.15, -5);
    }

    public addToken(x, y, player: TileState) {
        this.tiles[y][x].mark(player);
    }

    public isFull(): boolean {
        let emptyCount = 0;

        const tiles = this.tiles;
        for (let y = 0; y < 3; y++) {
            for (let x = 0; x < 3; x++) {
                if (tiles[y][x].getState() === TileState.Empty) {
                    emptyCount++;
                }
            }
        }

        return emptyCount === 0;
    }

    public isEmpty(x, y) {
        return this.tiles[y][x].getState() === TileState.Empty;
    }
}
