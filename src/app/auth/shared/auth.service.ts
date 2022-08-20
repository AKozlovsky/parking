import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Credentials } from './credentials';
import { AuthResponse } from './auth-response';
import { AppSettings } from 'src/app/shared/app-settings';
import { User } from './user';
import { TokenPayload } from './token-payload';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
  loginUrl = '/auth/authenticate';
  localLoginUrl = 'auth';
  organisationPrefix = 'ORG_';

  constructor(private http: HttpClient, private jwt: JwtHelperService) {}

  login(credentials: Credentials): Promise<any> {
    let userInfo = new Credentials();
    userInfo.username = this.organisationPrefix + credentials.username;
    userInfo.password = credentials.password;

    return this.http
      .post<AuthResponse>(
        environment.authApiEndpoint + this.loginUrl,
        JSON.stringify(userInfo)
      )
      .toPromise()
      .then((response) => {
        localStorage.setItem(
          this.getTokenStorageName('default'),
          response.token
        );
        const user = this.getUserFromToken(response.token);
        if (user.username == 'Admin User') user.admin = true;
        localStorage.setItem(
          AppSettings.storageNames.user,
          JSON.stringify(user)
        );
        this.removePageIndexies();
      })
      .catch(this.handleError);
  }

  getUserFromToken(token: string): User {
    const payload: TokenPayload = this.decodeToken(token);
    return <User>{
      username: payload.first_name + ' ' + payload.surname,
      email: payload.email,
      admin: false,
    };
  }

  decodeToken(token: string): TokenPayload {
    return this.jwt.decodeToken(token);
  }

  getTokenStorageName(key: string = null): string {
    if (key === null) return this.getDefaultTokenStorageName();
    return AppSettings.storageNames.tokens[
      this.getTokenStorageNameIndexOrDefault(key)
    ].name;
  }

  getDefaultTokenStorageName(): string {
    return AppSettings.storageNames.tokens[0].name;
  }

  getUser(): User {
    if (!this.hasStoragedUser()) return null;
    return <User>(
      JSON.parse(localStorage.getItem(AppSettings.storageNames.user))
    );
  }

  hasStoragedUser(): boolean {
    if (localStorage.getItem(AppSettings.storageNames.user) === null)
      return false;
    return true;
  }

  logout() {
    AppSettings.storageNames.tokens.forEach((token) =>
      localStorage.removeItem(token.name)
    );
    localStorage.removeItem(AppSettings.storageNames.user);
    this.removePageIndexies();
  }

  isAdmin(): boolean {
    if (!this.hasStoragedUser()) return false;
    return this.getUser().admin;
  }

  getProfileName(): string {
    if (!this.hasStoragedUser()) return '';
    const user = this.getUser();
    return user.username;
  }

  isTokenExpired(token: string, offsetSeconds: number | null = null): boolean {
    return this.jwt.isTokenExpired(token, offsetSeconds);
  }

  getToken(name?: string): string {
    if (name === null)
      return localStorage.getItem(AppSettings.storageNames.tokens[0].name);
    return localStorage.getItem(this.getTokenStorageName(name));
  }

  loggedIn(defaultTokenExpirationOffset): boolean {
    if (this.isTokenExpired(this.getToken(), defaultTokenExpirationOffset)) {
      return false;
    } else {
      return true;
    }
  }

  private getTokenStorageNameIndexOrDefault(key: string): number {
    const index = AppSettings.storageNames.tokens.findIndex(function (token) {
      return token.key === key;
    });
    if (index === -1) return 0;
    return index;
  }

  private handleError(error: HttpErrorResponse): Promise<any> {
    return Promise.reject(error);
  }

  private removePageIndexies() {
    localStorage.removeItem(AppSettings.storageNames.places.pageIndex);
  }
}
