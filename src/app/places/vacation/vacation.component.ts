import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import moment from 'moment';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { CommonComponent } from 'src/app/common/common.component';
import { CommonService } from 'src/app/common/common.service';
import { Place } from '../shared/place';
import { Vacation } from '../shared/vacation';

@Component({
  selector: 'app-vacation',
  templateUrl: './vacation.component.html',
  styleUrls: ['./vacation.component.css'],
})
export class VacationComponent extends CommonComponent implements OnInit {
  vacationForm: FormGroup;
  parkNumberOptions: any[] = [];
  selected: any;
  selectedOption: boolean = false;

  @Input() message = '';
  @Input() selectedParkNumber: string;
  @Input() parkNumber: string;

  constructor(
    public title: Title,
    public translate: TranslateService,
    public auth: AuthService,
    public router: Router,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private route: ActivatedRoute
  ) {
    super(title, translate, auth, router);
    this.vacationForm = this.formBuilder.group({
      parkNumber: new FormControl('', Validators.required),
      startDate: new FormControl(moment(), Validators.required),
      endDate: new FormControl(moment(), Validators.required),
    });
  }

  ngOnInit() {
    this.setTitle('VACATION.NAV_TITLE');
    this.getAuthInfo();
    this.setSelectParkNumber();
  }

  tran(key: string): string {
    if (this.translateService !== undefined) {
      let result = '';
      this.translateService
        .get(key)
        .subscribe((tran: string) => (result = tran));
      return result;
    } else {
      console.log('TranslateService is undefined.');
      return key;
    }
  }

  async setSelectParkNumber() {
    if (this.user.admin) {
      if (this.route.snapshot.params['parkNumber'] != undefined) {
        let parkNumber = this.route.snapshot.params['parkNumber'];
        this.setParkNumber(parkNumber);
      } else this.setOptions();
    } else {
      let parkNumber = await this.commonService.getParkNumber(
        this.user.username
      );
      this.setParkNumber(parkNumber);
    }
  }

  setParkNumber(parkNumber: string): void {
    this.selectedOption = true;
    this.selectedParkNumber = parkNumber;
    this.selected = {
      value: this.selectedParkNumber,
      name: this.selectedParkNumber,
    };
  }

  setOptions(): void {
    this.commonService.getParkPlaces('').then((places) => {
      places.forEach((place: Place) => {
        this.parkNumberOptions.push({
          value: place.park_number,
          name: place.park_number,
        });
      });
    });
  }

  submit(value: any) {
    let startDate = moment(value.startDate).format('YYYY-MM-DD HH:mm:00');
    let endDate = moment(value.endDate).format('YYYY-MM-DD HH:mm:00');
    let vacation = new Vacation({
      park_number: value.parkNumber,
      vacation_start: startDate,
      vacation_end: endDate,
    });
    this.commonService.addVacation(vacation);
  }
}
