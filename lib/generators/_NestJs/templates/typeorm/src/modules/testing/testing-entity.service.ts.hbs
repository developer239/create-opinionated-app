/* eslint-disable security/detect-object-injection */
import { Inject, Injectable } from '@nestjs/common'
import { classToClass } from 'class-transformer'
import { BaseEntity, Connection } from 'typeorm'

type IConstructorOf<TEntity> = new () => TEntity

@Injectable()
export class TestingEntityService {
  constructor(@Inject('Connection') public connection: Connection) {}

  public async create<TEntity extends BaseEntity, TData>(
    model: IConstructorOf<TEntity>,
    data?: TData
  ): Promise<TEntity> {
    const instance = new model()

    for (const key of Object.keys(data)) {
      instance[key] = data[key]
    }

    await instance.save()

    return classToClass(instance)
  }

  public list<TEntity extends BaseEntity>(
    entityClass: string
  ): Promise<TEntity[]> {
    return this.connection.manager.find<TEntity>(entityClass)
  }
}
