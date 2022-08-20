import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonComponent } from 'src/app/common/common.component';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { Router } from '@angular/router';
import { ParkingSchemaService } from '../parking-schema.service';
import { CommonService } from 'src/app/common/common.service';

@Component({
  selector: 'app-parking-schema-actual',
  templateUrl: './parking-schema-actual.component.html',
  styleUrls: ['./parking-schema-actual.component.css'],
})
export class ParkingSchemaActualComponent
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
    let places = await this.commonService.getParkPlaces('actual');
    this.service.set(this.image, this.canvas, places);
  }
}
