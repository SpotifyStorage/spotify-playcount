import { Module, OnModuleInit } from '@nestjs/common';
import { SpotifyModule } from './spotify/spotify.module';
import { QueueModule } from './queue/queue.module';
import { QueueService } from './queue/queue.service';
import { SpotifyService } from './spotify/spotify.service';
import { TokenModule } from './token_handler/token.module';
import { TokenService } from './token_handler/token.service';
import { DiscoveryMicroserviceService } from './discovery-microservice/discovery-microservice.service';
import { DiscoveryMicroserviceModule } from './discovery-microservice/discovery-microservice.module';
import { AlbumQueuePopulatorModule } from './album-queue-populator/album-queue-populator.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    SpotifyModule,
    QueueModule,
    TokenModule,
    DiscoveryMicroserviceModule,
    AlbumQueuePopulatorModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
  ]
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly queueService: QueueService,
    private readonly spotifyService: SpotifyService,
    private readonly tokenService: TokenService,
    private readonly databaseService: DiscoveryMicroserviceService
  ) {}

  onModuleInit() {
    this.queueService.queueInit()
    this.queueService.queue$.subscribe(async x => {
      //console.log(x.albumUri)
      const playcounts = this.spotifyService.getAlbumPlaycount(
        x.albumUri, 
        (await this.tokenService.getValidToken()).accessToken
      )
      this.databaseService.postPlaycountData(await playcounts)
      //console.log(await playcounts)
    })    
  }
}
