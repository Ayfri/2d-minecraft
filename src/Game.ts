import * as PIXI from 'pixi.js';
import Blocks from './blocks/Blocks';
import Button from './client/Button';
import { Gui } from './client/Gui';
import TilePlacementGui from './client/TilePlacementGui';
import EventHandler from './client/input/EventHandler';
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
	private mainGui: Gui;

	constructor(public app: PIXI.Application) {
		this.world = new World(app);
		this.eventHandler = new EventHandler<GameEvents>();
		this.mouseManager = new MouseManager(app);
	}

	public init() {
		Blocks.registerBlocks();
		this.gameData.blocks.forEach((block) => {
			const path: Path = `./assets/sprites/${block.name}.png`;
			this.app.loader.add(`block:${block.name}`, path);
		});

		this.app.loader.load((loader, resources) => {
			for (let [name, block] of this.gameData.blocks) {
				const texture: PIXI.Texture = resources[`block:${name}`].texture;
				block.setTexture(texture);
			}

			this.player = new Player();
			this.player.setTexture(resources['block:void'].texture);
			this.tilePlacementGui = new TilePlacementGui(this.app);
			this.mainGui = new Gui(this.app);
			this.loaded = true;
			this.eventHandler.emit('launch');
		});
	}

	public preInit() {
		this.app.loader.onError.add((params) => {
			console.log(params);
		});

		this.app.renderer.view.style.position = 'absolute';
		this.app.renderer.view.style.display = 'block';
		this.app.renderer.autoDensity = true;
		this.app.renderer.resize(window.innerWidth, window.innerHeight);

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
		/*let resetButton: Button = new Button('reset');
		resetButton.on('click', (): void => {
			this.world.clear();
		});
		this.mainGui.addSprite('resetButton', resetButton);
		*/
		this.mainGui.show();
		this.tilePlacementGui.show();
	}

	public update() {
		this.player.update();
	}
}
