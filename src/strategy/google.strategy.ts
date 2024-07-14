import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) {
    const { name, emails, photos, provider } = profile;
    const email = emails[0].value;
    const photoUrl = photos[0].value;
    let user = await this.authService.findOneByEmail(email);

    if (!user) {
      const randomPassword = this.authService.generateRandomPassword();
      user = await this.authService.signUpWithProvider({
        email: email,
        name: `${name.givenName} ${name.familyName}`,
        password: randomPassword,
        photoUrl: photoUrl,
        provider: provider,
      });
    }

    const tokens = await this.authService.generateTokens(user);

    user.token = tokens.token;
    user.refreshToken = tokens.refreshToken;

    done(null, user);
  }
}
