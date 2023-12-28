import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';
import { SpotifyController } from 'src/spotify/spotify.controller';
import { SpotifyModule } from 'src/spotify/spotify.module';

@Module({
    imports: [HttpModule],
    controllers: [TokenController],
    providers: [TokenService],
    exports: [TokenService]
})
export class TokenModule {}
