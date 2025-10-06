import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

const fsPromises = fs.promises;

@Injectable()
export class LoggerService extends ConsoleLogger {
  async logToFile(message: string, context?: string): Promise<void> {
    const formattedEntry = `${Intl.DateTimeFormat('en-US', {
      dateStyle: 'short',
      timeStyle: 'short',
      timeZone: 'America/New_York',
    }).format(new Date())}\t${context ? context + '\t' : ''}${message}\n`;
    const logFilePath = path.join(__dirname, 'logs', 'app.log');
    const logDir = path.dirname(logFilePath);

    try {
      if (!fs.existsSync(logDir)) {
        await fsPromises.mkdir(logDir, { recursive: true });
      }
      await fsPromises.appendFile(logFilePath, formattedEntry);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Failed to write log to file: ${error.message}`);
      }
    }
  }

  log(message: any, context?: string): void {
    const entry = `${context}\t${message}`;
    this.logToFile(entry);

    super.log(message, context);
  }

  error(message: any, context?: string): void {
    const entry = `${context}\t${message}`;
    this.logToFile(entry);

    super.error(message, context);
  }
}
