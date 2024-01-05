import { DefaultAzureCredential } from '@azure/identity';
import { QueueClient } from '@azure/storage-queue';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
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
        this.logger.verbose(`Calling queue populator on MICROSERVICE_DISCOVERY_URL: ${this.configService.get("MICROSERVICE_DISCOVERY_URL")}/track/find_all_albums`)
        this.httpService
            .get<MinimalAlbum[]>(`${this.configService.get("MICROSERVICE_DISCOVERY_URL")}/album/get_all`)
            .subscribe(x => {
                this.addMessages(x.data)
            })
    }

    addMessages(minimalAlbums: MinimalAlbum[]) {
        this.logger.verbose(`Adding ${minimalAlbums.length} messages to the queue`)
        this.albumeQueueService.sendMessages(minimalAlbums)
        // const queueClient = new QueueClient(
        //     "https://spotifystoragequeues.queue.core.windows.net/spotify-album-1",
        //     new DefaultAzureCredential()
        // );
        
        // objects.forEach(object => {
        //     queueClient.sendMessage(JSON.stringify(object))
        // })
    }
}
