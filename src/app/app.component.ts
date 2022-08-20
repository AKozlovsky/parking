import { Component, OnInit } from '@angular/core';
import { AppSettings } from './shared/app-settings';
import { Title } from '@angular/platform-browser';
import { AppService } from './shared/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private title: Title, private service: AppService) {}

  ngOnInit() {
    this.service.setLanguages();
    this.service.setDefaultLanguage();
    this.title.setTitle(AppSettings.title);
  }
}
