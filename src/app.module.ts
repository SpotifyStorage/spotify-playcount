import { Module } from '@nestjs/common';
import { SpotifyModule } from './spotify/spotify.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackPlayCountEntity } from './entities/trackplaycount.entity';
import { TokenModule } from './token_handler/token.module';
import { DatabaseModule } from './database/database.module';


@Module({
  imports: [
    SpotifyModule,
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'sa',
      password: 'Password1!',
      database: 'model',
      entities: [TrackPlayCountEntity],
      synchronize: true,
      options: { encrypt: false },
    }),
  ]
})
export class AppModule {}
