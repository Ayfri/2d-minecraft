import AbstractBlock from '../blocks/AbstractBlock';
import SimpleRegistry from './SimpleRegistry';

export const blocks: SimpleRegistry<AbstractBlock> = new SimpleRegistry<AbstractBlock>();

export let resolution: number = 32;
// fixme: dynamic resolution not working
