import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SpotifyController } from './spotify.controller';
import { SpotifyService } from './spotify.service';
import { TokenService } from 'src/token_handler/token.service';
import { DatabaseController } from 'src/database/database.controler';
import { DatabaseService } from 'src/database/database.service';
import { TokenController } from 'src/token_handler/token.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackPlayCountEntity } from 'src/entities/trackplaycount.entity';

@Module({
    imports: [
        HttpModule,
        TypeOrmModule.forFeature([TrackPlayCountEntity])
    ],
    controllers: [SpotifyController, TokenController, DatabaseController],
    providers: [SpotifyService, TokenService, DatabaseService]
})
export class SpotifyModule {}
