import { HttpService } from "@nestjs/axios";
import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { stringify } from "querystring";
import { lastValueFrom, map } from "rxjs";
import { AccessToken } from "src/interfaces/spotify-responses/access-token.interface";
import { TokenDto } from "./dto";

@Injectable()
export class TokenService implements OnModuleInit{

    logger = new Logger(TokenService.name)

    constructor(
        private readonly httpService: HttpService
    ) {}
    
    activeToken = {
        clientId: '',
        accessToken: '',
        accessTokenExpirationTimestampMs: Date.now(),
        isAnonymous: true
    };

    async onModuleInit() {
        this.activeToken = await this.getNewToken()
    }

    async getNewToken(): Promise<AccessToken> {
        this.logger.verbose('Getting new spotify token')
        const url = 'https://open.spotify.com/get_access_token?';
        const payload = {
            reason: "transpost",
            productType: 'web_player'
        };
        return lastValueFrom(
            this.httpService
                .get<AccessToken>(url + stringify(payload))
                .pipe(
                    map(
                        axiosRespone => axiosRespone.data
                    )
                )
        )
    }

    isTokenActive(): Boolean {
        if (Date.now() > this.activeToken.accessTokenExpirationTimestampMs) {
            return false
        }
        return true
    }

    async getValidToken(): Promise<TokenDto> {
        if (!this.isTokenActive()) {
            this.activeToken = await this.getNewToken()
            return this.activeToken
        }
        return this.activeToken
    }
}