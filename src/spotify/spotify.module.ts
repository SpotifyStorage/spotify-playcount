import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SpotifyController } from './spotify.controller';
import { SpotifyService } from './spotify.service';
//import { DatabaseController } from 'src/database/database.controler';
//import { DatabaseService } from 'src/database/database.service';
import { TokenController } from 'src/token_handler/token.controller';
import { QueueModule } from 'src/queue/queue.module';
import { TokenModule } from 'src/token_handler/token.module';

@Module({
    imports: [HttpModule, QueueModule, TokenModule],
    controllers: [SpotifyController, TokenController],
    providers: [SpotifyService],
    exports: [SpotifyService]
})
export class SpotifyModule {}
