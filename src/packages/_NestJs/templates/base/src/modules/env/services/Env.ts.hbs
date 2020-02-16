import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class EnvService {
  constructor(private readonly configService: ConfigService) {}

  public getInt(key: string) {
    const value = this.getEnv(key)

    return Number(value)
  }

  public getString(key: string) {
    return this.getEnv(key)
  }

  private getEnv(key: string): string {
    const value = this.configService.get(key)

    if (typeof value === 'undefined') {
      throw new Error(`Environment value ${key} must be set.`)
    }

    return value
  }
}
