import {StringChunkPosition} from '../types';
import Position from './Position';

export default class ChunkPosition extends Position {
	constructor(public x: number, public y: number) {
		super(x, y);
	}
	
	public stringify(): StringChunkPosition {
		return JSON.stringify(this);
	}
}