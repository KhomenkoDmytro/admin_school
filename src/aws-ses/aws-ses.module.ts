import { Module } from '@nestjs/common';
import { AwsSesService } from './aws-ses.service';
import { AwsSesController } from './aws-ses.controller';

@Module({
  controllers: [AwsSesController],
  providers: [AwsSesService],
})
export class AwsSesModule {}
