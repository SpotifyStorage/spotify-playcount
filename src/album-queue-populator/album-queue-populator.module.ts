import { Module } from '@nestjs/common';
import { AlbumQueuePopulatorService } from './album-queue-populator.service';
import { HttpModule } from '@nestjs/axios';
import { AlbumQueuePopulatorController } from './album-queue-populator.controller';

@Module({
  imports: [HttpModule],
  controllers: [AlbumQueuePopulatorController],
  providers: [AlbumQueuePopulatorService]
})
export class AlbumQueuePopulatorModule {}
