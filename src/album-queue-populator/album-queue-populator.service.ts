import { DefaultAzureCredential } from '@azure/identity';
import { QueueClient } from '@azure/storage-queue';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AlbumQueuePopulatorService {
    // 1. call l'autre container pour avoir une liste d'albums
    // 2. ajouteur ces éléments à la queue

    constructor(
        private readonly httpService: HttpService,
    ) {}

    populateQueue() {
        this.httpService
            .get<{albumUri: string}[]>('https://discover-new-releases.livelyocean-7de1f403.canadacentral.azurecontainerapps.io/track/find_all_albums')
            .subscribe(x => {
                this.addMessages(x.data)
            })
        
    }

    addMessages(objects: Object[]) {
        const queueClient = new QueueClient(
            "https://spotifystoragequeues.queue.core.windows.net/spotify-album-1",
            new DefaultAzureCredential()
        );
        
        objects.forEach(object => {
            queueClient.sendMessage(JSON.stringify(object))
        })

    }
}
