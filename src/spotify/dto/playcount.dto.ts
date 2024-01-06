import { PlaycountTableItem } from "src/interfaces/playcount-table-item.interface";

export class PlaycountDto {
    uri: string;
    playcount: number;
    date: number;
    albumUri: string;

    static fromTableItem(tableItem: PlaycountTableItem): PlaycountDto {
        return {
            uri: tableItem.partitionKey,
            playcount: tableItem.playcount,
            date: new Date(tableItem.timestamp).getTime(),
            albumUri: tableItem.albumUri
        }
    }
}
