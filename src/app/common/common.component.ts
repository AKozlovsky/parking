import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppSettings } from '../shared/app-settings';
import { FormControl } from '@angular/forms';
import { AppNavigations } from '../shared/app-navigation';
import { Navigation, ToolbarComponent } from 'common-components';
import { PageEvent } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../auth/shared/user';
import { AuthService } from '../auth/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.scss'],
})
export class CommonComponent implements OnInit {
  appTitle: string = AppSettings.title;
  dateFrom: any;
  dateTo: any;
  displayMode: string;
  displayModes: any = [];
  id: string;
  isAdmin: boolean;
  from: FormControl;
  maxDate = new Date();
  minDate: Date;
  navigationApplication: Navigation[] = AppNavigations.application;
  navigationModules: Navigation[] = AppNavigations.modules;
  pageIndex = 0;
  pageSize = AppSettings.defaultPageSize;
  pageSizeOptions = AppSettings.defaultPageSizeOptions;
  profileName: string;
  progressBarColor = AppSettings.defaultProgressBarColor;
  progressBarMode = 'indeterminate';
  showProgressBar: boolean = false;
  protected storageNames: { pageSize: string; pageIndex: string };
  timeFrom = '00:00';
  timeTo = '23:59';
  to: FormControl;
  user: User;

  @Input() displayedColumns: string[];
  @Input() translate: TranslateService;

  @ViewChild('toolbar') toolbar: ToolbarComponent;

  constructor(
    public title: Title,
    public translateService: TranslateService,
    public auth: AuthService,
    public router: Router
  ) {
    this.user = this.auth.getUser();
  }

  ngOnInit(): void {}

  protected initPaginator() {
    if (localStorage.getItem(this.storageNames.pageSize) !== null) {
      this.pageSize = Number.parseInt(
        localStorage.getItem(this.storageNames.pageSize),
        10
      );
    }
    if (localStorage.getItem(this.storageNames.pageIndex) !== null) {
      this.pageIndex = Number.parseInt(
        localStorage.getItem(this.storageNames.pageIndex),
        10
      );
    }
  }

  page(page: PageEvent) {
    localStorage.setItem(this.storageNames.pageSize, page.pageSize.toString());
    localStorage.setItem(
      this.storageNames.pageIndex,
      page.pageIndex.toString()
    );
  }

  public setTitle(moduleTitle) {
    this.translateService
      .get(moduleTitle)
      .subscribe((tran: string) => this.title.setTitle(tran));
  }

  login() {
    this.router.navigateByUrl('/auth');
  }

  logout() {
    this.auth.logout();
    location.reload();
  }

  getAuthInfo() {
    this.isAdmin = this.auth.isAdmin();
    this.profileName = this.auth.getProfileName();
    this.user = this.auth.getUser();
  }
}
