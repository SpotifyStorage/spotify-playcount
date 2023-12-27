import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';
import { SpotifyController } from 'src/spotify/spotify.controller';
import { DatabaseController } from 'src/database/database.controler';

@Module({
    imports: [HttpModule],
    controllers: [TokenController, SpotifyController, DatabaseController],
    providers: [TokenService]
})
export class TokenModule {}
