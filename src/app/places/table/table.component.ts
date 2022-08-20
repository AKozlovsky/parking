import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CommonComponent } from 'src/app/common/common.component';
import { AppSettings } from 'src/app/shared/app-settings';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Place } from '../shared/place';
import { MatSort } from '@angular/material/sort';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent extends CommonComponent implements OnInit {
  storageNames = AppSettings.storageNames.places;
  private paginator: MatPaginator;

  @Input() dataSource: MatTableDataSource<Place> =
    new MatTableDataSource<Place>();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.paginator = paginator;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(
    public title: Title,
    public translateService: TranslateService,
    public auth: AuthService,
    public router: Router
  ) {
    super(title, translateService, auth, router);
  }

  ngOnInit(): void {
    this.initPaginator();
    this.isAdmin = this.auth.isAdmin();
  }

  goToVacation(parkNumber: string): void {
    this.router.navigate(['/vacation/' + parkNumber]);
  }
}
