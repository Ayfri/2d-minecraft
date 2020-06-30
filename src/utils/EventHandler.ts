import {EventKey, EventMap, EventReceiver} from '../types';
import {EventEmitter} from 'events';
import IEmitter from './IEmitter';

export default class EventHandler<T extends EventMap> implements IEmitter<T> {
	private emitter: EventEmitter = new EventEmitter();
	
	on<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void {
		this.emitter.on(eventName, fn);
	}
	
	off<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void {
		this.emitter.off(eventName, fn);
	}
	
	emit<K extends EventKey<T>>(eventName: K, params: T[K]): void {
		this.emitter.emit(eventName, params);
	}
}