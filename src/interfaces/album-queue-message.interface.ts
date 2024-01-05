import { ServiceBusReceivedMessage } from "@azure/service-bus"
import { MinimalAlbum } from "./minimal-album.interface"

export interface AlbumQueueMessage extends ServiceBusReceivedMessage {
    body: MinimalAlbum[]
}