import {BlockType} from '../types';
import Block from './Block';

export default class AirBlock extends Block {
	constructor() {
		super('air', BlockType.AIR);
	}
}