import { DefaultAzureCredential } from '@azure/identity';
import { QueueClient } from '@azure/storage-queue';
import { Injectable } from '@nestjs/common';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class QueueService {
    queue$ = new Subject<{uri: string}>()

    async getSingleMessage() {
        const queueClient = new QueueClient(
            "https://spotifystoragequeues.queue.core.windows.net/spotify-album-1",
            new DefaultAzureCredential()
        );

        const response = await queueClient.receiveMessages({
            numberOfMessages: 1,
        });

        const message = response.receivedMessageItems[0];
        if (!message) {
            return null;
        }
        await queueClient.deleteMessage(message.messageId, message.popReceipt);
        return JSON.parse(message.messageText)
    }

    async queueInit() {
        const queueClient = new QueueClient(
            "https://spotifystoragequeues.queue.core.windows.net/spotify-album-1",
            new DefaultAzureCredential()
        );
        
        while (true) {
            const response = await queueClient.receiveMessages({
                numberOfMessages: 1,
            });
    
            const message = response.receivedMessageItems[0];
            if (message) {
                await queueClient.deleteMessage(message.messageId, message.popReceipt);
                this.queue$.next(JSON.parse(message.messageText))
            }
        }
    }
}
