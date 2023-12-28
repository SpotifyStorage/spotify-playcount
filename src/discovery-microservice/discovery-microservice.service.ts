import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { lastValueFrom } from "rxjs";
import { PlaycountDto } from "src/spotify/dto";

@Injectable()
export class DiscoveryMicroserviceService {

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
    ) {}
    logger = new Logger(DiscoveryMicroserviceService.name)

    postPlaycountData(tracksData: PlaycountDto[]) {
        this.logger.verbose(`Posting playcount data to MICROSERVICE_DISCOVERY: ${this.configService.get('MICROSERVICE_DISCOVERY_URL')}/track/playcount`)
        return lastValueFrom(
            this.httpService
                .post(`${this.configService.get('MICROSERVICE_DISCOVERY_URL')}/track/playcount`, tracksData)
        )
    }
    
}