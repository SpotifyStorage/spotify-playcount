import { Controller, Get, Query } from "@nestjs/common";
import { SpotifyService } from "./spotify.service";
import { ApiQuery } from '@nestjs/swagger';
import { TokenService } from "src/token_handler/token.service";


@Controller()
export class SpotifyController {
    constructor(
        private readonly spotifyService: SpotifyService,
        private readonly tokenService: TokenService
    ) {}

    @ApiQuery({name: 'albumid'})
    @Get('albumPlayCount')
    async getAlbumPlayCount(@Query('albumid') albumId) {
        return this.spotifyService.getAlbumPlayCount(
            this.spotifyService.getHeader((await this.tokenService.getValidToken()).accessToken),
            this.spotifyService.getPayload(albumId)
        )
    }
}