import { DefaultAzureCredential } from '@azure/identity';
import { ServiceBusClient, ServiceBusReceivedMessage, ServiceBusReceiver, ServiceBusSender } from '@azure/service-bus';
import { QueueClient } from '@azure/storage-queue';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { type } from 'os';
import { Subject } from 'rxjs';
import { AlbumQueueMessage } from 'src/interfaces/album-queue-message.interface';
import { MinimalAlbum } from 'src/interfaces/minimal-album.interface';

@Injectable()
export class AlbumQueueService implements OnModuleInit{
    queue$ = new Subject<{albumUri: string}>()
    fullyQualifiedNamespace = "spotifystorage.servicebus.windows.net";
    credential = new DefaultAzureCredential();
    queueName = "album"
    sbClient: ServiceBusClient;
    sender: ServiceBusSender;
    mainReceiver: ServiceBusReceiver;
    
    onModuleInit() {
        this.sbClient = new ServiceBusClient(this.fullyQualifiedNamespace, this.credential);
        this.sender = this.sbClient.createSender(this.queueName);
        this.mainReceiver = this.sbClient.createReceiver(this.queueName);
    }

    addReceiver(processMessageCallback: (message: AlbumQueueMessage) => Promise<void>) {
        const receiver = this.sbClient.createReceiver(this.queueName);
        receiver.subscribe({
            processMessage: processMessageCallback,
            processError: async (err) => {
                console.log("Error", err);
            }
        });
        return receiver;
    }

    async getSingleMessage() {
        const messages = await this.mainReceiver.receiveMessages(1);
        const message = messages[0];
        if (!message) {
            return null;
        }
        await this.mainReceiver.completeMessage(message);
        return JSON.parse(message.body)
    }

    closeReceiver(receiver: ServiceBusReceiver) {
        return receiver.close();
    }

    async sendMessages(message: MinimalAlbum[]) {
        await this.sender.sendMessages({
            body: message
        })
    }
}
