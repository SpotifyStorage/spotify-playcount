import { Controller, Get } from "@nestjs/common";
import { AlbumQueuePopulatorService } from "./album-queue-populator.service";
import { ApiTags } from "@nestjs/swagger";

@Controller('album_queue')
@ApiTags('AlbumQueue')
export class AlbumQueuePopulatorController {
    constructor(
        private readonly albumQueuePopulatorService: AlbumQueuePopulatorService
    ) {}


    @Get('populate')
    populateAlbumQueue() {
        return this.albumQueuePopulatorService.populateQueue()
    }
}