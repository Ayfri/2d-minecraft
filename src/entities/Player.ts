import AbstractBlock from '../blocks/AbstractBlock';
import { game } from '../main';
import { PlayerEvents } from '../types';
import ChunkPosition from '../utils/ChunkPosition';
import EventEmitter from '../utils/EventEmitter';
import Position from '../utils/Position';
import TilePosition from '../utils/TilePosition';
import Entity from './Entity';

export default class Player extends Entity {
	public selectedBlock: AbstractBlock;
	public eventEmitter: EventEmitter<PlayerEvents>;
	public tileOn: TilePosition;
	private chunkIn: ChunkPosition;

	constructor() {
		super();
		this.position = new Position(0, 0);
		this.selectedBlock = game.gameData.blocks.get('dirt');
		this.eventEmitter = new EventEmitter();
		this.tileOn = new TilePosition(0, 0);
		this.chunkIn = new ChunkPosition(0, 0);
	}

	public putBlockWhereClicked(): void {
		const position: TilePosition = TilePosition.fromPositionToTilePosition(game.mouseManager.getMousePosition());
		this.position = position.toPosition();
		if (game.world.getTileAt(position).block.name !== this.selectedBlock.name) game.world.replaceBlock(this.selectedBlock, position);
		this.eventEmitter.emit('placeBlock', this.selectedBlock, this.tileOn);
	}

	public update(): void {
		this.tileOn = TilePosition.fromPositionToTilePosition(game.mouseManager.getMousePosition());
		if (!this.chunkIn.equals(this.tileOn.toChunkPosition())) {
			this.chunkIn = this.tileOn.toChunkPosition();
			this.eventEmitter.emit('changeChunk', this.tileOn.toChunkPosition());
		}
	}
}
