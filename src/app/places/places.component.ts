import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { CommonComponent } from '../common/common.component';
import { AuthService } from '../auth/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss'],
})
export class PlacesComponent extends CommonComponent implements OnInit {
  constructor(
    public title: Title,
    public translate: TranslateService,
    public auth: AuthService,
    public router: Router
  ) {
    super(title, translate, auth, router);
  }

  ngOnInit(): void {
    this.setTitle('PLACES.TITLE');
    this.getAuthInfo();
  }
}
