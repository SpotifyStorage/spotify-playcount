import { Module } from '@nestjs/common';
import { PlaycountDatabaseService } from './playcount-database.service';

@Module({
  providers: [PlaycountDatabaseService],
  exports: [PlaycountDatabaseService]
})
export class PlaycountDatabaseModule {}
