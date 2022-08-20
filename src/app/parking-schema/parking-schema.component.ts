import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../auth/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parking-schema',
  templateUrl: './parking-schema.component.html',
  styleUrls: ['./parking-schema.component.scss'],
})
export class ParkingSchemaComponent extends CommonComponent implements OnInit {
  constructor(
    public title: Title,
    public translate: TranslateService,
    public auth: AuthService,
    public router: Router
  ) {
    super(title, translate, auth, router);
  }

  ngOnInit(): void {
    this.setTitle('PARKING_SCHEMA.TITLE');
    this.getAuthInfo();
  }
}
