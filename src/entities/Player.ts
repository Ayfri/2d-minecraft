import Block from '../blocks/Block';
import Blocks from '../blocks/Blocks';
import Inventory from '../inventory/Inventory';
import Slot from '../inventory/Slot';
import { game } from '../main';
import { InventoryType, PlayerEvents } from '../types';
import EventEmitter from '../utils/EventEmitter';
import Position from '../utils/Position';
import TilePosition from '../utils/TilePosition';
import Entity from './Entity';

export default class Player extends Entity {
	public selectedSlot: Slot;
	public eventEmitter: EventEmitter<PlayerEvents>;
	public tileOn: TilePosition;
	public hotBar: Inventory;

	constructor() {
		super();
		this.position = new Position(0, 0);
		this.eventEmitter = new EventEmitter();
		this.tileOn = new TilePosition(0, 0);
		this.hotBar = new Inventory(9, 1, InventoryType.HOTBAR);
		this.hotBar.container.position.set(window.innerWidth / 2 - this.hotBar.container.width / 2, window.innerHeight - window.innerHeight / 6);
		this.selectedSlot = this.hotBar.getSlotAt(0);

		game.mainGui.addObject('hotbar', this.hotBar.container);
	}

	public putBlockWhereClicked(): void {
		const position: TilePosition = TilePosition.fromPositionToTilePosition(game.mouseManager.getMousePosition());
		const block: Block = this.selectedSlot.item ? this.selectedSlot.item.block : Blocks.AIR;
		if (game.world.getTileAt(position).block.name !== block.name) game.world.replaceBlock(block, position);
		this.position = position.toPosition();
		this.eventEmitter.emit('placeBlock', block, this.tileOn);
	}

	public update(): void {
		this.tileOn = TilePosition.fromPositionToTilePosition(game.mouseManager.getMousePosition());
	}
}
