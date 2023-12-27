import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SpotifyController } from './spotify.controller';
import { SpotifyService } from './spotify.service';
import { TokenController } from 'src/token_handler/token.controller';
import { TokenService } from 'src/token_handler/token.service';

@Module({
    imports: [HttpModule],
    controllers: [SpotifyController, TokenController],
    providers: [SpotifyService, TokenService]
})
export class SpotifyModule {}
