import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PlaycountDatabaseService } from 'src/playcount-database/playcount-database.service';

@Controller('playcount')
@ApiTags('Playcount')
export class PlaycountController {
    //get total playcount for an album
    constructor(
        private readonly playcountDatabaseService: PlaycountDatabaseService
    ) { }

    @Get('album/latest/total')
    @ApiOperation({ summary: 'Get latest playcount total for an album' })
    async getLatestAlbumPlaycount(@Query('albumid') albumId: string) {
        return (await this.playcountDatabaseService.getManyLatestByAlbumUri(albumId))
            .reduce((acc, curr) => acc + curr.playcount, 0);
    }

    @Get('album/latest/individuals')
    @ApiOperation({ summary: 'Get latest playcounts for an album' })
    async getLatestAlbumPlaycountIndividuals(@Query('albumid') albumId: string) {
        return (await this.playcountDatabaseService.getManyLatestByAlbumUri(albumId))
    }

    @Get('track/latest')
    @ApiOperation({ summary: 'Get latest playcount for a track' })
    async getLatestTrackPlaycount(@Query('trackid') trackId: string) {
        return ((await this.playcountDatabaseService.getOneLatest(trackId)).playcount)
    }

    @Get('track/history')
    @ApiOperation({ summary: 'Get playcount history for a track' })
    async getTrackPlaycountHistory(@Query('trackid') trackId: string) {
        return (await this.playcountDatabaseService.getMany(trackId))
    }
}
