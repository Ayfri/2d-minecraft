import Key from './client/input/Key';

export type EventMap = Record<string, any[]>;
export type EventKey<T extends EventMap> = string & keyof T;
export type EventReceiver<T extends readonly any[]> = (...params: T) => void;

export type GameEvents = {
	click: [PIXI.InteractionEvent],
	mousemove: [PIXI.InteractionEvent],
	mousedown: [PIXI.InteractionEvent],
	mouseup: [PIXI.InteractionEvent],
	launch: [],
	keyup: [Key, KeyboardEvent]
	keydown: [Key, KeyboardEvent]
};


export type Path = string;

export type StringChunkPosition = string;
export type StringTilePosition = string;
export type StringPosition = string;

export enum Layer {
	BACKGROUND,
	BACK_TILE,
	FRONT_TILE,
	SPRITE
}

export enum BlockType {
	AIR,
	PLAIN
}