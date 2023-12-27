import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { stringify } from "querystring";
import { lastValueFrom, map } from "rxjs";
import { AlbumResponse } from "src/interfaces/spotify-responses/album-response.interface";

@Injectable()
export class SpotifyService {

    constructor(private readonly httpService: HttpService) {}
    
    getHeader(authToken: string) {
        return {
            'accept': 'application/json',
            'app-platform': 'WebPlayer',
            'content-type': 'application/json',
            'origin': 'https://open.spotify.com',
            'referer': 'https://open.spotify.com/',
            'spotify-app-version': '1.2.15.275.g634be5e0',
            'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
            'authorization': `Bearer ${authToken}`
        }
    }

    getPayload(albumUid: string) {
        return {
            'operationName': 'getAlbum',
            'variables': JSON.stringify({
                "uri": `spotify:album:${albumUid}`,
                "locale": "",
                "offset": 0,
                "limit": 50
            }),
            'extensions': JSON.stringify({
                "persistedQuery": {
                    "version": 1,
                    "sha256Hash": "46ae954ef2d2fe7732b4b2b4022157b2e18b7ea84f70591ceb164e4de1b5d5d3"
                }
            })
        }
    }

    getAlbumPlayCount(header, payload) {
        return lastValueFrom(
            this.httpService
                .get<AlbumResponse>('https://api-partner.spotify.com/pathfinder/v1/query?' + stringify(payload), {headers: header})
                .pipe(
                    map(
                        axiosResponse => axiosResponse.data
                    )
                )
        )
    }
}