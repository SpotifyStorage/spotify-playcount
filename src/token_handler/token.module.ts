import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';
import { SpotifyController } from 'src/spotify/spotify.controller';

@Module({
    imports: [HttpModule],
    controllers: [TokenController, SpotifyController],
    providers: [TokenService]
})
export class TokenModule {}
