import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { SpotifyModule } from './spotify/spotify.module';
import { AlbumQueueModule } from './album-queue/album-queue.module';
import { AlbumQueueService } from './album-queue/album-queue.service';
import { SpotifyService } from './spotify/spotify.service';
import { TokenModule } from './token_handler/token.module';
import { TokenService } from './token_handler/token.service';
import { DiscoveryMicroserviceService } from './discovery-microservice/discovery-microservice.service';
import { DiscoveryMicroserviceModule } from './discovery-microservice/discovery-microservice.module';
import { AlbumQueuePopulatorModule } from './album-queue-populator/album-queue-populator.module';
import { ConfigModule } from '@nestjs/config';
import { time } from 'console';
import { PlaycountDatabaseModule } from './playcount-database/playcount-database.module';
import { PlaycountDatabaseService } from './playcount-database/playcount-database.service';
import { PlaycountModule } from './playcount/playcount.module';

@Module({
  imports: [
    SpotifyModule,
    AlbumQueueModule,
    TokenModule,
    DiscoveryMicroserviceModule,
    AlbumQueuePopulatorModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    PlaycountDatabaseModule,
    PlaycountModule,
  ]
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly albumQueueService: AlbumQueueService,
    private readonly spotifyService: SpotifyService,
    private readonly tokenService: TokenService,
    private readonly discoveryMicroservice: DiscoveryMicroserviceService,
    private readonly playcountDatabaseService: PlaycountDatabaseService
    ) {}

  logger = new Logger(AppModule.name)

  onModuleInit() {
    const receiver = this.albumQueueService.addReceiver(async message => {
      this.logger.verbose(`Received a messages from the queue containing ${message.body.length} albums`)
      message.body.forEach(async album => {
        const playcounts = this.spotifyService.getAlbumPlaycount(
          album.albumUri,
          (await this.tokenService.getValidToken()).accessToken
        )
        await this.playcountDatabaseService.addMany(await playcounts)
        // await this.discoveryMicroservice.postPlaycountData(await playcounts)
      })
    })
  }

}
