import * as PIXI from 'pixi.js';
import Blocks from './blocks/Blocks';
import Button from './client/Button';
import { Gui } from './client/Gui';
import GameRenderer from './client/renderer/GameRenderer';
import TilePlacementGui from './client/TilePlacementGui';
import TextureManager from './ressources/TextureManager';
import EventHandler from './utils/EventHandler';
import Key from './client/input/Key';
import MouseManager from './client/input/MouseManager';
import Player from './entities/Player';
import * as GameData from './ressources/GameData';
import { GameEvents, Path } from './types';
import TilePosition from './utils/TilePosition';
import World from './world/World';

export default class Game {
	public eventHandler: EventHandler<GameEvents>;
	public gameData = GameData;
	public tilePlacementGui: TilePlacementGui;
	public loaded: boolean = false;
	public mouseManager: MouseManager;
	public player: Player;
	public world: World;
	public renderer: GameRenderer;
	public textureManager: TextureManager;
	private mainGui: Gui;

	constructor(public app: PIXI.Application) {
		this.world = new World(app);
		this.eventHandler = new EventHandler<GameEvents>();
	}

	public init() {
		this.renderer = new GameRenderer();
		this.textureManager = new TextureManager(this.app);
		this.mouseManager = new MouseManager(this.app);
		this.mainGui = new Gui(this.app);

		Blocks.registerBlocks();
		this.gameData.blocks.forEach((block) => {
			const path: Path = `./assets/sprites/${block.name}.png`;
			this.textureManager.preLoadTexture(path, `block:${block.name}`);
		});

		this.app.loader.onComplete.add(() => {
			for (const [name, block] of this.gameData.blocks) {
				block.setTexture(this.textureManager.getTexture(`block:${name}`));
			}
			this.player = new Player();
			this.player.setTexture(this.textureManager.getTexture('block:void'));
			this.tilePlacementGui = new TilePlacementGui(this.app);
			this.loaded = true;
			this.eventHandler.emit('launch');
		});

		this.app.loader.load();
	}

	public preInit() {
		this.app.loader.onError.add((params) => {
			console.warn(params);
		});

		this.app.renderer.plugins.interaction.on('mouseup', (event: PIXI.InteractionEvent) => this.eventHandler.emit('mouseup', event));
		this.app.renderer.plugins.interaction.on('mousedown', (event: PIXI.InteractionEvent) => this.eventHandler.emit('mousedown', event));
		this.app.renderer.plugins.interaction.on('mousemove', (event: PIXI.InteractionEvent) => this.eventHandler.emit('mousemove', event));
		this.app.renderer.plugins.interaction.on('click', (event: PIXI.InteractionEvent) => this.eventHandler.emit('click', event));

		document.addEventListener('keydown', (event: KeyboardEvent) => {
			const key: Key = new Key(event.key);
			key.isDown = true;
			this.eventHandler.emit('keydown', key, event);
		});

		document.addEventListener('keyup', (event: KeyboardEvent) => {
			const key: Key = new Key(event.key);
			key.isUp = true;
			this.eventHandler.emit('keyup', key, event);
		});

		document.body.appendChild(this.app.view);
	}

	public postInit() {
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				this.world.placeBlock(this.gameData.blocks.get('void'), new TilePosition(i, j));
			}
		}

		this.world.placeBlock(this.gameData.blocks.get('dirt'), new TilePosition(15, 2));
		const resetButton: Button = new Button('reset', 50, 30);
		resetButton.position.set(10, 10);
		resetButton.on('click', (): void => {
			this.world.clear();
		});
		this.mainGui.addPIXISprite('resetButton', resetButton);
		this.mainGui.show();
		this.tilePlacementGui.show();
	}

	public update() {
		this.player.update();
	}
}
