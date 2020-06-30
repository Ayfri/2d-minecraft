import {EventKey, EventMap, EventReceiver} from '../types';

export default interface IEmitter<T extends EventMap> {
	on<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void;
	
	off<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void;
	
	emit<K extends EventKey<T>>(eventName: K, params: T[K]): void;
}