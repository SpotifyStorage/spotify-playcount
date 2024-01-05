import { Controller, Get, Logger, Query } from "@nestjs/common";
import { SpotifyService } from "./spotify.service";
import { ApiQuery } from '@nestjs/swagger';
import { TokenService } from "src/token_handler/token.service";
import { AlbumQueueService } from "src/album-queue/album-queue.service";


@Controller()
export class SpotifyController {
    constructor(
        private readonly spotifyService: SpotifyService,
        private readonly tokenService: TokenService,
        private readonly albumQueueService: AlbumQueueService,
    ) {}
    logger = new Logger(SpotifyController.name)

    @ApiQuery({name: 'albumid'})
    @Get('albumData')
    async getAlbumData(@Query('albumid') albumId: string) {
        return this.spotifyService.getAlbumData(
            this.spotifyService.getHeader((await this.tokenService.getValidToken()).accessToken),
            this.spotifyService.getPayload(albumId)
        )
    }

    @Get('albumPlayCount')
    async getAlbumPlaycount(@Query('albumid') albumId: string) {
        this.logger.verbose('Getting album playcount for ' + albumId)
        return this.spotifyService.getAlbumPlaycount(
            albumId, 
            (await this.tokenService.getValidToken()).accessToken
        )
    }

    @Get('queue')
    getQueueSingleMessage() {
        return this.albumQueueService.getSingleMessage()
    }
}

