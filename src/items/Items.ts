import SimpleRegistry from '../ressources/SimpleRegistry';
import AbstractItem from './AbstractItem';

export default class Items {
	public static readonly list: SimpleRegistry<AbstractItem> = new SimpleRegistry<AbstractItem>();
}
