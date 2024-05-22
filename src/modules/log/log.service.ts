import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

/* Entity */
import { LogEntity } from './log.entity';

/* Dto */
import { LogDto } from './log.dto';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(LogEntity)
    private readonly _logRepository: Repository<LogEntity>,
  ) {}

  async logCreate(body: LogDto) {
    const createLog = this._logRepository.create(body);

    const saveLog = await this._logRepository.save(createLog);
    return { message: 'Log registrado', data: saveLog };
  }
}
