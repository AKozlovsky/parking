import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { CommonComponent } from 'src/app/common/common.component';
import { CommonService } from 'src/app/common/common.service';
import { ParkingSchemaService } from '../parking-schema.service';

@Component({
  selector: 'app-parking-schema-tomorrow',
  templateUrl: './parking-schema-tomorrow.component.html',
  styleUrls: ['./parking-schema-tomorrow.component.css'],
})
export class ParkingSchemaTomorrowComponent
  extends CommonComponent
  implements OnInit, AfterViewInit
{
  @ViewChild('img') image: ElementRef<HTMLImageElement>;
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;

  constructor(
    public title: Title,
    public translate: TranslateService,
    public auth: AuthService,
    public router: Router,
    private service: ParkingSchemaService,
    private commonService: CommonService
  ) {
    super(title, translate, auth, router);
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.setParkPlaces();
  }

  async setParkPlaces() {
    let places = await this.commonService.getParkPlaces('tomorrow');
    this.service.set(this.image, this.canvas, places);
  }
}
