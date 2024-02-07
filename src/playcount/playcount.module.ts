import { Module } from '@nestjs/common';
import { PlaycountController } from './playcount.controller';
import { PlaycountDatabaseModule } from 'src/playcount-database/playcount-database.module';

@Module({
  imports: [PlaycountDatabaseModule],
  controllers: [PlaycountController]
})
export class PlaycountModule { }
