import { EventEmitter } from 'events';
import { EventKey, EventMap, EventReceiver } from '../../types';
import IEmitter from '../../utils/IEmitter';

export default class EventHandler<T extends EventMap> implements IEmitter<T> {
	private emitter: EventEmitter = new EventEmitter();

	on<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void {
		this.emitter.on(eventName, fn as EventReceiver<any[]>);
	}

	once<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void {
		this.emitter.once(eventName, fn as EventReceiver<any[]>);
	}

	off<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void {
		this.emitter.off(eventName, fn as EventReceiver<any[]>);
	}

	emit<K extends EventKey<T>>(eventName: K, ...params: T[K]): void {
		this.emitter.emit(eventName, ...params);
	}
}
