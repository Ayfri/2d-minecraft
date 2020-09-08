import Key from './client/input/Key';
import * as PIXI from 'pixi.js';

export type EventMap = Record<string, any[]>;
export type EventKey<T extends EventMap> = string & keyof T;
export type EventReceiver<T extends readonly any[]> = (...params: T) => void;

export type GameEvents = {
	click: [PIXI.InteractionEvent];
	mousemove: [PIXI.InteractionEvent];
	mousedown: [PIXI.InteractionEvent];
	mouseup: [PIXI.InteractionEvent];
	launch: [];
	keyup: [Key, KeyboardEvent];
	keydown: [Key, KeyboardEvent];
};

export type ColorEvents = {
	change: [red: number, green: number, blue: number, alpha: number];
	redChange: [number];
	greenChange: [number];
	blueChange: [number];
	alphaChange: [number];
};

export type ButtonEvents = {
	click: [PIXI.InteractionEvent];
	release: [PIXI.InteractionEvent];
	hold: [PIXI.InteractionEvent];
	hover: [PIXI.InteractionEvent];
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
	AIR,
	PLAIN,
}
