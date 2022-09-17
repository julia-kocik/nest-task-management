import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() authCredentials: CreateUserDto): Promise<void> {
    return this.authService.signUp(authCredentials);
  }

  @Post('signin')
  signIn(
    @Body() authCredentials: CreateUserDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentials);
  }
  // sample protected handler
  @Post('test')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log(req);
  }
}
