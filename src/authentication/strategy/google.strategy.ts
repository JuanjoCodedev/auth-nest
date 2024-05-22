import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';

import { AuthenticationService } from '../authentication.service';
import { TokenService } from '../token/token.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly _authService: AuthenticationService,
    private readonly _tokenService: TokenService,
    config: ConfigService,
  ) {
    super({
      clientID: config.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: config.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: config.get<string>('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { name, emails, photos, provider } = profile;
    let user = await this._authService.findOneByEmail(emails[0].value);

    if (!user) {
      const randomPassword = await this._authService.generateRandomText();
      const hashedPassword = await this._authService.textHash(randomPassword, 12);

      user = await this._authService.continueWithTheProvider({
        provider: provider,
        email: emails[0].value,
        name: `${name.givenName}`,
        last_name: `${name.familyName}`,
        password: hashedPassword,
      });
    }

    const tokens = await this._tokenService.generateAccessAndRefreshTokens(user);

    return { user, accessToken: tokens.token, refreshToken: tokens.refreshToken };
  }
}
