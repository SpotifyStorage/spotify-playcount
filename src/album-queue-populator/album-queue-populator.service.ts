import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { first } from 'rxjs';
import { AlbumQueueService } from 'src/album-queue/album-queue.service';
import { MinimalAlbum } from 'src/interfaces/minimal-album.interface';

@Injectable()
export class AlbumQueuePopulatorService {
    // 1. call l'autre container pour avoir une liste d'albums
    // 2. ajouteur ces éléments à la queue
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
        private albumeQueueService: AlbumQueueService
    ) {}
    logger = new Logger(AlbumQueuePopulatorService.name)

    populateQueue() {
        this.logger.verbose(`Calling queue populator on MICROSERVICE_DISCOVERY_URL: ${this.configService.get("MICROSERVICE_DISCOVERY_URL")}/album/all`)
        this.httpService
            .get<MinimalAlbum[]>(`${this.configService.get("MICROSERVICE_DISCOVERY_URL")}/album/all`)
            .pipe(
                first()
            )
            .subscribe(x => {
                this.logger.verbose(`Adding ${x.data.length} messages to the queue`)
                x.data.forEach(album => {
                    this.addMessages([album])
                })
            })
    }

    addMessages(minimalAlbums: MinimalAlbum[]) {
        this.logger.verbose(`Adding ${minimalAlbums.length} messages to the queue`)
        this.albumeQueueService.sendMessages(minimalAlbums)
    }
}
