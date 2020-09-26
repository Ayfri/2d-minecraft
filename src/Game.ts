import Blocks from './blocks/Blocks';
import DebugGui from './client/gui/DebugGui';
import MainGui from './client/gui/MainGui';
import TilePlacementGui from './client/gui/TilePlacementGui';
import Key from './client/input/Key';
import MouseManager from './client/input/MouseManager';
import FallingTile from './client/renderer/FallingTile';
import GameRenderer from './client/renderer/GameRenderer';
import Tile from './client/renderer/Tile';
import Player from './entities/Player';
import ItemStack from './inventory/ItemStack';
import BlockItem from './items/BlockItem';
import Items from './items/Items';
import PIXI from './PIXI';
import TextureManager from './ressources/TextureManager';
import { BlockType, GameEvents, Path } from './types';
import ChunkPosition from './utils/ChunkPosition';
import EventEmitter from './utils/EventEmitter';
import TilePosition from './utils/TilePosition';
import World from './world/World';

export default class Game {
	public eventHandler: EventEmitter<GameEvents>;
	public tilePlacementGui: TilePlacementGui;
	public loaded: boolean = false;
	public mouseManager: MouseManager;
	public player: Player;
	public world: World;
	public renderer: GameRenderer;
	public textureManager: TextureManager;
	public debugGui: DebugGui;
	public sandTile;
	public mainGui: MainGui;

	constructor(public app: PIXI.Application) {
		this.eventHandler = new EventEmitter<GameEvents>();

		this.eventHandler.once('launch', () => {
			this.postInit();
			console.log('Game launched.');
		});
	}

	public init() {
		this.renderer = new GameRenderer();
		this.textureManager = new TextureManager(this.app);
		this.mouseManager = new MouseManager(this.app);
		this.mainGui = new MainGui(this.app);
		this.debugGui = new DebugGui(this.app);

		Blocks.list.forEach((block) => {
			const path: Path = `./assets/sprites/${block.name}.png`;
			this.textureManager.preLoadTexture(path, `block:${block.name}`);
		});

		this.app.loader.onComplete.add(() => {
			const getTexture = (name: string): PIXI.Texture => {
				return this.textureManager.getTexture(name) ?? this.textureManager.getTexture(`block:void`);
			};

			for (const [name, block] of Blocks.list) {
				block.setTexture(getTexture(`block:${name}`));
				if (block.type === BlockType.AIR) {
					block.setTexture(this.textureManager.getTexture('block:air'));
				}
			}

			for (let [name, item] of Items.list) {
				item.setTexture(getTexture((item as BlockItem).block ? `block:${name}` : `item${name}`));
			}

			this.world = new World(this.app);
			this.world.background.texture = this.textureManager.getTexture('background');
			this.app.stage.addChild(this.world.background);
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

		this.app.renderer.plugins.interaction.on('mouseup', (event: PIXI.InteractionEvent) => this.eventHandler.emit('mouseUp', event));
		this.app.renderer.plugins.interaction.on('mousedown', (event: PIXI.InteractionEvent) => this.eventHandler.emit('mouseDown', event));
		this.app.renderer.plugins.interaction.on('mousemove', (event: PIXI.InteractionEvent) => this.eventHandler.emit('mouseMove', event));
		this.app.renderer.plugins.interaction.on('mouseupoutside', (event: PIXI.InteractionEvent) => this.eventHandler.emit('mouseUpOutside', event));
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
		this.mainGui.show();
		this.debugGui.show();
		this.tilePlacementGui.show();

		/*this.player.eventEmitter.on('changeChunk', (position: ChunkPosition) => {
			this.world.ensureChunkAt(position);
			this.world.updateRendering();
		});*/

		this.player.hotBar.addItemStack(ItemStack.from(Items.STONE));
		this.player.hotBar.addItemStack(ItemStack.from(Items.DIRT));
		this.player.hotBar.addItemStack(ItemStack.from(Items.GRASS));
		this.player.hotBar.addItemStack(ItemStack.from(Items.SAND));
		this.player.hotBar.addItemStack(ItemStack.from(Items.OAK_LOG));
		this.player.hotBar.addItemStack(ItemStack.from(Items.OAK_LEAVES));
	}

	public update() {
		this.player.update();
		this.debugGui.update();
		this.mainGui.update();
		//noinspection JSIgnoredPromiseFromCall
		this.world.update();
	}
}
