import { Module } from "@nestjs/common";
import { DatabaseService } from "./database.service";
import { HttpModule } from "@nestjs/axios";

@Module({
    imports: [HttpModule],
    controllers: [],
    providers: [DatabaseService],
    exports: [DatabaseService]
})
export class DatabaseModule {}