import type PIXI from './PIXI';
import type AbstractBlock from './blocks/AbstractBlock';
import type Key from './client/input/Key';
import type ChunkPosition from './utils/ChunkPosition';
import type Position from './utils/Position';
import TilePosition from './utils/TilePosition';

export type EventMap = Record<string, any[]>;
export type EventKey<T extends EventMap> = string & keyof T;
export type EventReceiver<T extends readonly any[]> = (...params: T) => void;

export type GameEvents = {
	click: [PIXI.InteractionEvent];
	mouseMove: [PIXI.InteractionEvent];
	mouseDown: [PIXI.InteractionEvent];
	mouseUp: [PIXI.InteractionEvent];
	mouseUpOutside: [PIXI.InteractionEvent];
	launch: [];
	keyup: [Key, KeyboardEvent];
	keydown: [Key, KeyboardEvent];
};

export type PlayerEvents = {
	changeChunk: [ChunkPosition];
	placeBlock: [AbstractBlock, TilePosition];
};

export type ColorEvents = {
	change: [red: number, green: number, blue: number, alpha: number];
	redChange: [number];
	greenChange: [number];
	blueChange: [number];
	alphaChange: [number];
};

export enum Directions {
	UP,
	DOWN,
	LEFT,
	RIGHT,
}

export type TileEvents = {
	place: [Position];
	replace: [position: Position, replacer: AbstractBlock];
};

export type Path = string;

export type StringChunkPosition = string;
export type StringTilePosition = string;
export type StringPosition = string;

export enum Layer {
	BACKGROUND,
	BACK_TILE,
	FRONT_TILE,
	SPRITE,
}

export enum BlockType {
	AIR = 'air',
	PLAIN = 'plain',
	FALLING = 'falling',
}

export enum InventoryType {
	HOTBAR,
}
