import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(authCredentials: CreateUserDto): Promise<void>;
    signIn(authCredentials: CreateUserDto): Promise<{
        accessToken: string;
    }>;
    test(req: any): void;
}
