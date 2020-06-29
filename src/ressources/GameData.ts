import Block from '../blocks/Block';
import SimpleRegistry from './SimpleRegistry';

export const blocks: SimpleRegistry<Block> = new SimpleRegistry<Block>();

export let resolution: number = 32;
// fixme: dynamic resolution not working