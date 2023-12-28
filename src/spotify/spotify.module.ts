import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SpotifyController } from './spotify.controller';
import { SpotifyService } from './spotify.service';
import { TokenService } from 'src/token_handler/token.service';
//import { DatabaseController } from 'src/database/database.controler';
//import { DatabaseService } from 'src/database/database.service';
import { TokenController } from 'src/token_handler/token.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [HttpModule],
    controllers: [SpotifyController, TokenController],
    providers: [SpotifyService, TokenService]
})
export class SpotifyModule {}
