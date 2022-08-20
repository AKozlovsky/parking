import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppSettings } from 'src/app/shared/app-settings';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { CommonComponent } from 'src/app/common/common.component';
import { CommonService } from 'src/app/common/common.service';
import { Place } from '../shared/place';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-places-tomorrow',
  templateUrl: './places-tomorrow.component.html',
  styleUrls: ['./places-tomorrow.component.css'],
})
export class PlacesTomorrowComponent extends CommonComponent implements OnInit {
  dataSource: MatTableDataSource<Place> = new MatTableDataSource<Place>();
  displayedColumns = AppSettings.columns.places;
  @ViewChild('table') tableData: TableComponent;

  constructor(
    private commonService: CommonService,
    public title: Title,
    public translate: TranslateService,
    public auth: AuthService,
    public router: Router
  ) {
    super(title, translate, auth, router);
  }

  ngOnInit(): void {
    this.refreshTable();

    if (this.auth.isAdmin())
      this.displayedColumns = AppSettings.columns.places_admin;
  }

  async refreshTable(): Promise<any> {
    this.showProgressBar = true;
    this.dataSource.data = await this.commonService.getParkPlaces('tomorrow');
    this.showProgressBar = false;
  }
}
