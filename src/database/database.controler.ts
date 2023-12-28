// import { Controller, Get, Query } from "@nestjs/common";
// import { DatabaseService } from "./database.service";
// import { ApiQuery } from "@nestjs/swagger";
// import { SpotifyService } from "src/spotify/spotify.service";
// import { TokenService } from "src/token_handler/token.service";

// @Controller()
// export class DatabaseController {
//     constructor(
//         private readonly spotifyService: SpotifyService,
//         private readonly databaseService: DatabaseService,
//         private readonly tokenService: TokenService
//     ) {}

//     @ApiQuery({name: 'albumid'})
//     @Get('postAlbumData')
//     async getAlbumData(@Query('albumid') albumId: string) {
//         const albumData = await this.spotifyService.getAlbumPlayCount(albumId, (await this.tokenService.getValidToken()).accessToken)
//         return this.databaseService.addPlaycountData(albumData)
//     }
// }