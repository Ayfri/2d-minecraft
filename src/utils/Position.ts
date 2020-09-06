import {game} from '../main';
import {resolution} from '../ressources/GameData';
import {StringPosition} from '../types';
import IPosition from './IPosition';
import TilePosition from './TilePosition';

export default class Position implements IPosition {
	constructor(public x: number = 0, public y: number = 0) {
	}
	
	public add(x: number, y: number): Position {
		return new Position(this.x + x, this.y + y);
	}
	
	public multiply(ratio: number): Position {
		return new Position(this.x * ratio, this.y * ratio);
	}
	
	public subtract(x: number = 0, y: number = 0): Position {
		return this.add(-x, -y);
	}
	
	public round(): Position {
		return new Position(Math.round(this.x), Math.round(this.y));
	}
	
	public divide(ratio: number): Position {
		return new Position(this.x / ratio, this.y / ratio);
	}
	
	public stringify(): StringPosition {
		return JSON.stringify(this);
	}
	
	public toString(): string {
		return `[x: ${this.x}, y: ${this.y}]`;
	}
}