import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { parse } from 'pg-connection-string'
import { EnvModule } from 'src/modules/env/env.module'
import { EnvService } from 'src/modules/env/env.service'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvModule],
      inject: [EnvService],
      useFactory: (envService: EnvService) => {
        const pgUrl = parse(envService.getString('DATABASE_URL'))

        return {
          type: 'postgres',
          host: pgUrl.host,
          port: Number(pgUrl.port),
          username: pgUrl.user,
          password: pgUrl.password,
          database: pgUrl.database,
          entities: [`${__dirname}/../**/*.entity.{js,ts}`],
          synchronize: true,
        }
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
