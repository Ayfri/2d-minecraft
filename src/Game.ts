import * as PIXI from 'pixi.js';
import Blocks from './blocks/Blocks';
import EventHandler from './utils/EventHandler';
import Player from './client/Player';
import * as GameData from './ressources/GameData';
import World from './world/World';
import {GameEvents} from './types';

export default class Game {
	public player: Player;
	public world: World;
	public eventHandler: EventHandler<GameEvents>;
	public loaded: boolean = false;
	public gameData = GameData;
	
	constructor(public app: PIXI.Application) {
		this.world = new World(app);
		this.eventHandler = new EventHandler<GameEvents>();
	}
	
	public init() {
		Blocks.registerBlocks();
		this.app.loader.load((loader, resources) => {
			Blocks.setTexturesOfBlocks(resources);
			this.player = new Player();
			this.loaded = true;
			this.eventHandler.emit('launch', undefined);
		});
	}
	
	public preInit() {
		this.app.loader.onError.add(params => {
			console.log(params);
		});
		
		this.app.renderer.view.style.position = 'absolute';
		this.app.renderer.view.style.display = 'block';
		this.app.renderer.autoDensity = true;
		this.app.renderer.resize(window.innerWidth - 50, window.innerHeight - 50);
		
		this.app.renderer.plugins.interaction.on('mouseup', (event: PIXI.InteractionEvent) => this.eventHandler.emit('mouseup', event));
		this.app.renderer.plugins.interaction.on('mousedown', (event: PIXI.InteractionEvent) => this.eventHandler.emit('mousedown', event));
		this.app.renderer.plugins.interaction.on('mousemove', (event: PIXI.InteractionEvent) => this.eventHandler.emit('mousemove', event));
		this.app.renderer.plugins.interaction.on('click', (event: PIXI.InteractionEvent) => this.eventHandler.emit('click', event));
		
		document.body.appendChild(this.app.view);
	}
}