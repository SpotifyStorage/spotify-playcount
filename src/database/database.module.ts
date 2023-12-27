import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TrackPlayCountEntity } from "src/entities/trackplaycount.entity";
import { DatabaseController } from "./database.controler";
import { DatabaseService } from "./database.service";
import { SpotifyService } from "src/spotify/spotify.service";
import { TokenService } from "src/token_handler/token.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([TrackPlayCountEntity])
    ],
    controllers: [DatabaseController],
    providers: [DatabaseService, SpotifyService, TokenService]
})
export class DatabaseModule {}