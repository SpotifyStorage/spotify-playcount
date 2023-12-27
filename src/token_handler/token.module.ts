import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';

@Module({
    imports: [HttpModule],
    controllers: [TokenController],
    providers: [TokenService]
})
export class TokenModule {}
