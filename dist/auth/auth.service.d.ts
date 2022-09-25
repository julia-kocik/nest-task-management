import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: UserRepository, jwtService: JwtService);
    signUp(authCredentials: CreateUserDto): Promise<void>;
    signIn(authCredentials: CreateUserDto): Promise<{
        accessToken: string;
    }>;
}
