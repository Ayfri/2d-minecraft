import * as PIXI from 'pixi.js';
import Block from './blocks/Block';
import Blocks from './blocks/Blocks';
import * as GameData from './ressources/GameData';
import SimpleRegistry from './ressources/SimpleRegistry';
import World from './world/World';

export default class Game {
	public world: World;
	public loaded: boolean = false;
	public gameData: { blocks: SimpleRegistry<Block> } = GameData;
	
	constructor(public app: PIXI.Application) {
		this.world = new World(app);
	}
	
	public init() {
		Blocks.registerBlocks();
		this.app.loader.load((loader, resources) => {
			Blocks.setTexturesOfBlocks(resources);
			this.loaded = true;
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
		
		document.body.appendChild(this.app.view);
	}
}