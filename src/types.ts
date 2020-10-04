import type Block from './blocks/Block';
import type Key from './client/input/Key';
import type ItemStack from './inventory/ItemStack';
import type PIXI from './PIXI';
import type Position from './utils/Position';
import type TilePosition from './utils/TilePosition';

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
	placeBlock: [Block, TilePosition];
};

export type ColorEvents = {
	change: [red: number, green: number, blue: number, alpha: number];
	redChange: [number];
	greenChange: [number];
	blueChange: [number];
	alphaChange: [number];
};

export type SlotEvents = {
	countChange: [ItemStack];
};

export type TileEvents = {
	update: [];
	tick: [];
	place: [Position];
	replace: [position: Position, replacer: Block];
};

export type Path = string;

export type StringChunkPosition = string;

export type StringTilePosition = string;
export type StringPosition = string;

export enum Directions {
	UP,
	DOWN,
	LEFT,
	RIGHT,
}

export enum LogType {
	error = 'error',
	warn = 'warn',
	event = 'event',
	log = 'log',
	debug = 'debug',
}

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
	GRASS = 'grass',
	DIRT = 'dirt',
}

export enum InventoryType {
	HOTBAR,
}

export enum ItemType {
	BLOCK,
	NORMAL,
}
