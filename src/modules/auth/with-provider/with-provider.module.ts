import { Module } from '@nestjs/common';
import { WithProviderController } from './with-provider.controller';

@Module({
  controllers: [WithProviderController],
})
export class WithProviderModule {}
