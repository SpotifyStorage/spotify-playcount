import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { lastValueFrom } from "rxjs";
import { PlaycountDto } from "src/spotify/dto";

@Injectable()
export class DatabaseService {

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
    ) {}

    postPlaycountData(tracksData: PlaycountDto[]) {
        return lastValueFrom(
            this.httpService
                .post(`${this.configService.get('MICROSERVICE_DISCOVERY_URL')}/track/playcount`, tracksData)
        )
    }
    
}