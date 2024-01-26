import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SpotifyController } from './spotify.controller';
import { SpotifyService } from './spotify.service';
import { TokenController } from 'src/token_handler/token.controller';
import { AlbumQueueModule } from 'src/album-queue/album-queue.module';
import { TokenModule } from 'src/token_handler/token.module';
import { PlaycountDatabaseModule } from 'src/playcount-database/playcount-database.module';

@Module({
    imports: [
        HttpModule,
        AlbumQueueModule,
        TokenModule,
        PlaycountDatabaseModule
    ],
    controllers: [SpotifyController, TokenController],
    providers: [SpotifyService],
    exports: [SpotifyService]
})
export class SpotifyModule { }
