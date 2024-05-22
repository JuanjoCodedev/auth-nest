import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { UserEntity } from 'src/user/user.entity';

import { TokenService } from './token/token.service';
import { EmailerService } from 'src/emailer/emailer.service';

import { AuthenticationForgotPasswordDto, AuthenticationResetPasswordDto, AuthenticationSignInDto } from './authentication.dto';
import { UserDto } from 'src/user/user.dto';

import { Authentication } from './authentication.interface';

@Injectable()
export class AuthenticationService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly _authRepository: Repository<UserEntity>,

        private readonly _tokenService: TokenService,

        private readonly _emailerService: EmailerService,
    ) { }

    public async findOneByEmail(userEmail: string): Promise<UserEntity | null> {
        return this._authRepository.findOne({ where: { email: userEmail } });
    }

    public async textHash(key: string, salt: number): Promise<string> {
        const hashText = await bcrypt.hash(key, salt);
        return hashText;
    }

    public async generateRandomText(): Promise<string> {
        return Math.random().toString(36).slice(-8);
    }

    public async continueWithTheProvider(userData: Partial<UserEntity>): Promise<UserEntity> {
        const user = this._authRepository.create({ ...userData, status: false });
        return this._authRepository.save(user);
    }

    public async signIn(body: AuthenticationSignInDto): Promise<Authentication.SignInResponse> {
        const user = await this.findOneByEmail(body.email);
        if (!user) throw new UnauthorizedException('correo electrónico invalido.');

        const isMatch = await bcrypt.compare(body.password, user.password);
        if (!isMatch) throw new UnauthorizedException('Contraseña incorrecta');

        return this._tokenService.generateAccessAndRefreshTokens(user);
    }

    public async signUp(body: UserDto): Promise<Authentication.SignUpResponse> {
        const user = await this.findOneByEmail(body.email);
        if (user) throw new ConflictException('Pruebe con un correo electrónico diferente');

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(body.password, salt);

        const newUser = this._authRepository.create({ ...body, password: hashedPassword, provider: 'auth system', created_at: new Date() });
        const savedUser = await this._authRepository.save(newUser);

        const { password, ...userWithoutPassword } = savedUser;
        return userWithoutPassword;
    }

    public async forgotPassword(body: AuthenticationForgotPasswordDto) {
        const user = await this.findOneByEmail(body.email);
        if (!user) throw new UnauthorizedException('correo electrónico invalido.');

        const resetToken = await this._tokenService.generateResetToken(user.id);

        const plainPassword = await this.generateRandomText();
        const newPassword = await this.textHash(plainPassword, 12);

        user.password = newPassword;
        await this._authRepository.save(user);

        const checkLink = `https://tusitio.com/reset-password?token=${resetToken}`;

        this._emailerService.sendPasswordResetEmail({ email: user.email, name: user.name }, plainPassword, checkLink);
    }

    public async resetPassword(body: AuthenticationResetPasswordDto) {
        const userId = await this._tokenService.validateResetToken(body.token);

        const user = await this._authRepository.findOne({ where: { id: userId } });
        if (!user) throw new UnauthorizedException('Usuario no encontrado.');

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(body.newPassword, salt);

        await this._authRepository.save(user);
        return { message: 'Contraseña actualizada correctamente.' };
    }
}
