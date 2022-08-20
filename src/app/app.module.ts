import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PlacesComponent } from './places/places.component';
import { CommonComponent } from './common/common.component';
import { AppRoutingModule } from './shared/app-routing.module';
import {
  CommonModule,
  UpperCasePipe,
  DecimalPipe,
  DatePipe,
} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppService } from './shared/app.service';

import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginatorModule } from '@angular/material/paginator';

const Material = [
  MatInputModule,
  MatToolbarModule,
  MatCardModule,
  MatTableModule,
  MatSidenavModule,
  MatIconModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatGridListModule,
  MatTooltipModule,
  MatTabsModule,
  MatSortModule,
  MatProgressBarModule,
  MatPaginatorModule,
  MatButtonModule,
  MatFormFieldModule,
  MatSelectModule,
  NgxMatDatetimePickerModule,
  NgxMatTimepickerModule,
  NgxMatNativeDateModule,
];

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CommonComponentsModule } from 'common-components';
import { MatButtonModule } from '@angular/material/button';
import { ParkingSchemaComponent } from './parking-schema/parking-schema.component';
import { TableComponent } from './places/table/table.component';
import { AuthComponent } from './auth/auth.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './auth/shared/auth.service';
import { ParkingSchemaActualComponent } from './parking-schema/parking-schema-actual/parking-schema-actual.component';
import { ParkingSchemaTomorrowComponent } from './parking-schema/parking-schema-tomorrow/parking-schema-tomorrow.component';
import { PlacesActualComponent } from './places/places-actual/places-actual.component';
import { PlacesTomorrowComponent } from './places/places-tomorrow/places-tomorrow.component';
import { ParkingSchemaService } from './parking-schema/parking-schema.service';
import { VacationComponent } from './places/vacation/vacation.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {
  NgxMatDateAdapter,
  NgxMatDateFormats,
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
  NGX_MAT_DATE_FORMATS,
} from '@angular-material-components/datetime-picker';
import {
  CustomNgxDatetimeAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from './shared/customNgxDatetimeAdapter';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function tokenGetter() {
  return localStorage.getItem('token');
}

const CUSTOM_DATE_FORMATS: NgxMatDateFormats = {
  parse: {
    dateInput: 'l, LTS',
  },
  display: {
    dateInput: 'DD.MM.YYYY HH:mm',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    CommonComponent,
    TableComponent,
    ParkingSchemaComponent,
    ParkingSchemaActualComponent,
    ParkingSchemaTomorrowComponent,
    PlacesComponent,
    PlacesActualComponent,
    PlacesTomorrowComponent,
    VacationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    CommonComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Material,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      },
    }),
  ],
  providers: [
    DatePipe,
    DecimalPipe,
    UpperCasePipe,
    AppService,
    AuthService,
    ParkingSchemaService,
    {
      provide: NgxMatDateAdapter,
      useClass: CustomNgxDatetimeAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
