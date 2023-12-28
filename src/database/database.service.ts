import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { lastValueFrom } from "rxjs";
import { PlaycountDto } from "src/spotify/dto";

@Injectable()
export class DatabaseService {

    constructor(
        private readonly httpService: HttpService
    ) {}

    postPlaycountData(tracksData: PlaycountDto[]) {
        return lastValueFrom(
            this.httpService
                .post('https://discover-new-releases.livelyocean-7de1f403.canadacentral.azurecontainerapps.io/track/playcount', tracksData)
        )
    }
}