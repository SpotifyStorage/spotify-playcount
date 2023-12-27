import { Controller, Get, Query } from "@nestjs/common";
import { SpotifyService } from "./spotify.service";
import { ApiQuery } from '@nestjs/swagger';
import { TokenService } from "src/token_handler/token.service";
import { AlbumResponse } from "src/interfaces/spotify-responses/album-response.interface";


@Controller()
export class SpotifyController {
    constructor(
        private readonly spotifyService: SpotifyService,
        private readonly tokenService: TokenService
    ) {}

    @ApiQuery({name: 'albumid'})
    @Get('albumData')
    async getAlbumData(@Query('albumid') albumId: string) {
        return this.spotifyService.getAlbumData(
            this.spotifyService.getHeader((await this.tokenService.getValidToken()).accessToken),
            this.spotifyService.getPayload(albumId)
        )
    }

    @Get('albumPlayCount')
    async getAlbumPlayCount(@Query('albumid') albumId: string) {
        return this.spotifyService.getAlbumPlayCount(
            albumId, 
            (await this.tokenService.getValidToken()).accessToken
        )
    }
}

