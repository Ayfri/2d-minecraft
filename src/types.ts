import ChunkPosition from './utils/ChunkPosition';

// tslint:disable-next-line:no-any
export type EventMap = Record<string, any>;

export type EventKey<T extends EventMap> = string & keyof T;
export type EventReceiver<T> = (params: T) => void;

export type GameEvents = {
	click: PIXI.InteractionEvent,
	mousemove: PIXI.InteractionEvent,
	mousedown: PIXI.InteractionEvent,
	mouseup: PIXI.InteractionEvent,
	launch: undefined
};

export type Path = string;

export type StringChunkPosition = string;
export type StringPosition = string;

export enum Layer {
	BACKGROUND,
	TILE_BACK,
	TILE_FRONT,
	SPRITE
}

export enum BlockType {
	AIR,
	PLAIN
}