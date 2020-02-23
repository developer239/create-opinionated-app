/* eslint-disable no-await-in-loop */
import { Inject, Injectable } from '@nestjs/common'
import { Connection } from 'typeorm'

@Injectable()
export class TestingDatabaseService {
  constructor(@Inject('Connection') public connection: Connection) {}

  public async clearDb() {
    const entities = this.connection.entityMetadatas

    for (const entity of entities) {
      const repository = this.connection.getRepository(entity.name)
      await repository.query(
        `TRUNCATE TABLE "${entity.tableName}" RESTART IDENTITY CASCADE`
      )
    }
  }
}
