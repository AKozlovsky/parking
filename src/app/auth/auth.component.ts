import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from './shared/auth.service';
import { Credentials } from './shared/credentials';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent extends CommonComponent implements OnInit {
  progressBarOn = false;
  showMessage = false;
  message = '';
  credentials: Credentials = new Credentials();

  constructor(
    public title: Title,
    public translate: TranslateService,
    public auth: AuthService,
    public router: Router
  ) {
    super(title, translate, auth, router);
  }

  ngOnInit(): void {}

  login() {
    this.showMessage = false;
    this.progressBarOn = true;
    this.auth
      .login(this.credentials)
      .then(() => this.router.navigateByUrl('/'))
      .catch(() => this.badLogin());
  }

  badLogin() {
    this.progressBarOn = false;
    this.showMessage = true;
    this.message = 'AUTH.BAD_LOGIN';
  }
}
