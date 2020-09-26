import { LogType } from '../types';

export default class Logger {
	public constructor() {}

	public static log(text: string, title: string = LogType.log.toUpperCase()) {
		console.log(text);
	}
}
