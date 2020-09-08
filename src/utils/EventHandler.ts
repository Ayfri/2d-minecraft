import { EventEmitter } from 'events';
import { EventKey, EventMap, EventReceiver } from '../types';
import IEmitter from './IEmitter';

export default class EventHandler<T extends EventMap> implements IEmitter<T> {
	private emitter: EventEmitter = new EventEmitter();

	public on<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void {
		this.emitter.on(eventName, fn as EventReceiver<any[]>);
	}

	public once<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void {
		this.emitter.once(eventName, fn as EventReceiver<any[]>);
	}

	public off<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void {
		this.emitter.off(eventName, fn as EventReceiver<any[]>);
	}

	public emit<K extends EventKey<T>>(eventName: K, ...params: T[K]): void {
		this.emitter.emit(eventName, ...params);
	}
}
