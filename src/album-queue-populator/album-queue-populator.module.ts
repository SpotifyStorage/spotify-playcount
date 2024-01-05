import { Module } from '@nestjs/common';
import { AlbumQueuePopulatorService } from './album-queue-populator.service';
import { HttpModule } from '@nestjs/axios';
import { AlbumQueuePopulatorController } from './album-queue-populator.controller';
import { AlbumQueueModule } from 'src/album-queue/album-queue.module';

@Module({
  imports: [HttpModule, AlbumQueueModule],
  controllers: [AlbumQueuePopulatorController],
  providers: [AlbumQueuePopulatorService]
})
export class AlbumQueuePopulatorModule {}
