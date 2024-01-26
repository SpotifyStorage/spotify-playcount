import { Body, Controller, Get } from "@nestjs/common";
import { TokenService } from "./token.service";
import { TokenDto } from "./dto";

@Controller()
export class TokenController {
    constructor(private readonly tokenService: TokenService) { }

    @Get('token')
    token(@Body() dto: TokenDto) {
        return this.tokenService.getValidToken()
    }
}