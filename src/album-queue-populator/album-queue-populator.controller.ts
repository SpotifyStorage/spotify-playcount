import { Controller, Get } from "@nestjs/common";
import { AlbumQueuePopulatorService } from "./album-queue-populator.service";

@Controller('album_queue')
export class AlbumQueuePopulatorController {
    constructor(
        private readonly albumQueuePopulatorService: AlbumQueuePopulatorService
    ) {}


    @Get('populate')
    populateAlbumQueue() {
        return this.albumQueuePopulatorService.populateQueue()
    }
}