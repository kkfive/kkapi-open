import { UserService } from '../users/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/modules/users/schema/user.schema';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UserService, jwtService: JwtService);
    validateUser(username: string, pass: string): Promise<any>;
    login(user: User): Promise<string>;
}
