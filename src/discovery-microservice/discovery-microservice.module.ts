import { Module } from "@nestjs/common";
import { DiscoveryMicroserviceService } from "./discovery-microservice.service";
import { HttpModule } from "@nestjs/axios";

@Module({
    imports: [HttpModule],
    controllers: [],
    providers: [DiscoveryMicroserviceService],
    exports: [DiscoveryMicroserviceService]
})
export class DiscoveryMicroserviceModule {}