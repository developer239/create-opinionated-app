import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { EnvService } from 'src/modules/env/env.service'

type TNodeEnv = 'development' | 'test' | 'production' | 'ci'

const getEnvFilePath = (nodeEnv?: TNodeEnv) => {
  switch (nodeEnv) {
    case 'development':
      return '.env.development'
    case 'test':
      return '.env.test'
    case 'ci':
      return '.env.ci'
    default: {
      return undefined
    }
  }
}

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: getEnvFilePath(process.env.NODE_ENV as TNodeEnv),
    }),
  ],
  providers: [EnvService],
  exports: [EnvService],
})
export class EnvModule {}
