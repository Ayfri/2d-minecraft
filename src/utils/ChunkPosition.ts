import {StringChunkPosition} from '../types';

export default class ChunkPosition {
	constructor(public x: number, public y: number) {
	}
	
	public stringify(): StringChunkPosition {
		return JSON.stringify(this);
	}
	
	public toString(): string {
		return `[x: ${this.x}, y: ${this.y}]`;
	}
}