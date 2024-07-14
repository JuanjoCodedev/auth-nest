import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
      scope: ['user:email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: Function) {
    const { id, username, emails, photos, provider } = profile;
    const email = emails[0].value;
    const avatar = photos[0].value;

    let user = await this.authService.findOneByEmail(email);

    if (!user) {
      const randomPassword = this.authService.generateRandomPassword();
      user = await this.authService.signUpWithProvider({
        email: email,
        name: username,
        password: randomPassword,
        photoUrl: avatar,
        provider: provider,
      });
    }

    const tokens = await this.authService.generateTokens(user);

    user.token = tokens.token;
    user.refreshToken = tokens.refreshToken;

    done(null, user);
  }
}
