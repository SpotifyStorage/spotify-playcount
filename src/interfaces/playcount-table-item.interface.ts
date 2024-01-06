export interface PlaycountTableItem {
    partitionKey: string;
    rowKey: string;
    playcount: number;
    albumUri: string;
    timestamp?: Date;
}