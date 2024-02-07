import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { DefaultAzureCredential } from '@azure/identity';
import { TableClient, TableServiceClient, TransactionAction, odata } from '@azure/data-tables';
import { ConfigService } from '@nestjs/config';
import { PlaycountDto } from 'src/spotify/dto';
import { PlaycountTableItem } from 'src/interfaces/playcount-table-item.interface';
import { groupBy } from 'lodash';

@Injectable()
export class PlaycountDatabaseService implements OnModuleInit {
    playcountTableClient: TableClient;
    logger = new Logger(PlaycountDatabaseService.name)

    constructor(
        private readonly configService: ConfigService
    ) {}

    onModuleInit() {
        const credentials = new DefaultAzureCredential();
        this.playcountTableClient = new TableClient(
            this.configService.get('AZURE_TABLE_STORAGE_URL'),
            "playcount",
            credentials
        );
    }

    async addOne(playcountData: PlaycountDto) {
        this.logger.verbose(`Adding playcount data to database: ${playcountData.uri}`)
        const playcountTableItem: PlaycountTableItem = {
            partitionKey: playcountData.uri,
            rowKey: new Date().toISOString(), // Generate a unique row key using the current timestamp
            playcount: playcountData.playcount,
            albumUri: playcountData.albumUri
        }
        return await this.playcountTableClient.createEntity(playcountTableItem);
    }

    async addMany(playcountDtos: PlaycountDto[]) {
        this.logger.verbose(`Adding ${playcountDtos.length} playcount data to database`)
        return playcountDtos.map(async playcountDto => await this.addOne(playcountDto))
    }

    async getMany(uri: string) {
        this.logger.verbose(`Getting playcount data from database: ${uri}`)
        const playcountEntities = this.playcountTableClient.listEntities<PlaycountTableItem>({ queryOptions: { filter: `PartitionKey eq '${uri}'` } });
        const playcountDtos: PlaycountDto[] = [];
        for await (const entity of playcountEntities) {
            playcountDtos.push(PlaycountDto.fromTableItem(entity));
        }
        
        return playcountDtos
    }

    async getOneLatest(uri: string) {
        this.logger.verbose(`Getting latest playcount data from database: ${uri}`)
        const playcountEntities = this.playcountTableClient.listEntities<PlaycountTableItem>({ queryOptions: { filter: `PartitionKey eq '${uri}'` } });
        const playcountDtos: PlaycountDto[] = [];
        for await (const entity of playcountEntities) {
            playcountDtos.push(PlaycountDto.fromTableItem(entity));
        }
        
        return playcountDtos
            .reduce((prev, current) => (prev.date > current.date) ? prev : current);
    }

    async getManyLatestByAlbumUri(albumUri: string) {
        this.logger.verbose(`Getting latest playcount data from database: ${albumUri}`)
        //Retrieve all playcount data for the album
        const playcountEntities = this.playcountTableClient.listEntities<PlaycountTableItem>({ queryOptions: { filter: `albumUri eq '${albumUri}'` } });
        
        const playcountDtos: PlaycountDto[] = [];

        for await (const entity of playcountEntities) {
            playcountDtos.push(PlaycountDto.fromTableItem(entity));
        }
        
        //Keeps only the latest playcount data for each track uri
        const latestPlaybookDtos = Object.values(groupBy(playcountDtos, 'uri'))
            .map(playcountDtos => playcountDtos
                .reduce((prev, current) => (prev.date > current.date) ? prev : current));

        return latestPlaybookDtos;
    }

    async getOneByDate(uri: string, date: string) { //not tested
        this.logger.verbose(`Getting playcount data from database: ${uri} on ${date}`)
        return this.playcountTableClient.getEntity<PlaycountTableItem>(uri, date);
    }

    async getManyByDateRange(uri: string, startDate: string, endDate: string) { //not tested
        this.logger.verbose(`Getting playcount data from database: ${uri} between ${startDate} and ${endDate}`)
        const playcountEntities = this.playcountTableClient.listEntities<PlaycountTableItem>({ queryOptions: { filter: odata`PartitionKey eq '${uri}' and RowKey ge '${startDate}' and RowKey le '${endDate}'` } });
        const playcountDtos: PlaycountDto[] = [];
        for await (const entity of playcountEntities) {
            playcountDtos.push(PlaycountDto.fromTableItem(entity));
        }
        
        return playcountDtos
    }

    async getManyByLastWeek(uri: string) {
        
    }

}
