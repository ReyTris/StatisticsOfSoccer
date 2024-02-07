import { injectable } from 'inversify';
import { Logger } from 'tslog';
import { ILogger } from './logger.interface';

import 'reflect-metadata';

@injectable()
class LoggerService implements ILogger {
	logger: Logger<any>;

	constructor() {
		this.logger = new Logger();
	}

	log(...args: unknown[]) {
		this.logger.info(...args);
	}
	error(...args: unknown[]) {
		this.logger.error(...args);
	}
	warn(...args: unknown[]) {
		this.logger.warn(...args);
	}
}

export { LoggerService };
