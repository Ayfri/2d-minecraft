import Block from './blocks/Block';
import Blocks from './blocks/Blocks';
import DebugGui from './client/gui/DebugGui';
import MainGui from './client/gui/MainGui';
import TilePlacementGui from './client/gui/TilePlacementGui';
import Key from './client/input/Key';
import MouseManager from './client/input/MouseManager';
import GameRenderer from './client/renderer/GameRenderer';
import Player from './entities/Player';
import ItemStack from './inventory/ItemStack';
import BlockItem from './items/BlockItem';
import Items from './items/Items';
import PIXI from './PIXI';
import TextureManager from './ressources/TextureManager';
import { BlockType, GameEvents, Path } from './types';
import EventEmitter from './utils/EventEmitter';
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

		this.eventHandler.once('launch', (): void => {
			this.postInit();
			console.log('Game launched.');
		});
	}

	public init(): void {
		this.renderer = new GameRenderer();
		this.textureManager = new TextureManager(this.app);
		this.mouseManager = new MouseManager(this.app);
		this.mainGui = new MainGui(this.app);
		this.debugGui = new DebugGui(this.app);

		Blocks.list.forEach((block: Block): void => {
			const path: Path = `./assets/sprites/${block.name}.png`;
			this.textureManager.preLoadTexture(path, `block:${block.name}`);
		});

		this.app.loader.onComplete.add((): void => {
			const getTexture: (name: string) => PIXI.Texture = (name: string): PIXI.Texture => {
				return this.textureManager.getTexture(name) ?? this.textureManager.getTexture(`block:void`);
			};

			for (const [name, block] of Blocks.list) {
				block.setTexture(getTexture(`block:${name}`));
				if (block.type === BlockType.AIR) {
					block.setTexture(this.textureManager.getTexture('block:air'));
				}
			}

			for (const [name, item] of Items.list) {
				item.setTexture(getTexture((item as BlockItem).block ? `block:${name}` : `item${name}`));
			}

			this.world = new World(this.app);
			this.world.background.texture = this.textureManager.getTexture('background');
			this.app.stage.addChild(this.world.background);
			this.player = new Player();
			this.player.sprite.texture = this.textureManager.getTexture('block:void');
			this.tilePlacementGui = new TilePlacementGui(this.app);
			this.loaded = true;
			this.eventHandler.emit('launch');
		});

		this.app.loader.load();
	}

	public preInit(): void {
		this.app.loader.onError.add((params: any): void => {
			console.warn(params);
		});

		this.app.renderer.plugins.interaction.on('mouseup', (event: PIXI.InteractionEvent): void => this.eventHandler.emit('mouseUp', event));
		this.app.renderer.plugins.interaction.on('mousedown', (event: PIXI.InteractionEvent): void => this.eventHandler.emit('mouseDown', event));
		this.app.renderer.plugins.interaction.on('mousemove', (event: PIXI.InteractionEvent): void => this.eventHandler.emit('mouseMove', event));
		this.app.renderer.plugins.interaction.on('mouseupoutside', (event: PIXI.InteractionEvent): void => this.eventHandler.emit('mouseUpOutside', event));
		this.app.renderer.plugins.interaction.on('click', (event: PIXI.InteractionEvent): void => this.eventHandler.emit('click', event));

		document.addEventListener('keydown', (event: KeyboardEvent): void => {
			const key: Key = new Key(event.key);
			key.isDown = true;
			this.eventHandler.emit('keydown', key, event);
		});

		document.addEventListener('keyup', (event: KeyboardEvent): void => {
			const key: Key = new Key(event.key);
			key.isUp = true;
			this.eventHandler.emit('keyup', key, event);
		});

		document.body.appendChild(this.app.view);
	}

	public postInit(): void {
		this.player.hotBar.addItemStack(ItemStack.from(Items.STONE));
		this.player.hotBar.addItemStack(ItemStack.from(Items.DIRT));
		this.player.hotBar.addItemStack(ItemStack.from(Items.GRASS));
		this.player.hotBar.addItemStack(ItemStack.from(Items.SAND));
		this.player.hotBar.addItemStack(ItemStack.from(Items.OAK_LOG));
		this.player.hotBar.addItemStack(ItemStack.from(Items.OAK_LEAVES));

		this.app.ticker.add(
			() => {
				this.update();
			},
			undefined,
			PIXI.UPDATE_PRIORITY.HIGH
		);

		setInterval(() => {
			this.tick();
		}, 50);
	}

	public update(): void {
		this.player.update();
		this.debugGui.update();
		this.mainGui.update();
		//noinspection JSIgnoredPromiseFromCal
		this.world.update();
	}

	public tick(): void {
		this.world.tick();
	}
}
