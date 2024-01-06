import { Module } from '@nestjs/common';
import { AlbumQueueService } from './album-queue.service';

@Module({
  providers: [AlbumQueueService],
  exports: [AlbumQueueService],
})
export class AlbumQueueModule {}
