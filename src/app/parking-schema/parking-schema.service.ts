import { Injectable, ElementRef } from '@angular/core';
import data from '../../assets/data.json';
import { Circle } from './shared/circle';
import { Line } from './shared/line';
import { Rectangle } from './shared/rectangle';
import { CommonService } from 'src/app/common/common.service';
import { Place } from '../places/shared/place';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class ParkingSchemaService {
  canvas: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D;
  image: ElementRef<HTMLImageElement>;
  common: CommonService;
  rectangleWidth: number = 120;
  rectangleHeight: number = 60;
  circles: Circle[];
  lines: Line[];
  roads: Rectangle[];
  rectangles: Rectangle[];
  showNotes = false;
  places = [];

  constructor(private translateService: TranslateService) {}

  public data: {
    circles: Circle[];
    lines: Line[];
    roads: Rectangle[];
    rectangles: Rectangle[];
  }[] = data;

  set(
    image: ElementRef<HTMLImageElement>,
    canvas: ElementRef<HTMLCanvasElement>,
    places: any
  ) {
    this.image = image;
    this.canvas = canvas;
    this.ctx = this.canvas.nativeElement.getContext('2d');

    places.forEach((place: Place) => {
      this.places[place.park_number] = place;
    });

    this.draw();
  }

  draw() {
    this.clearCanvas();
    this.drawCircles();
    this.drawLines();
    this.drawRoads();
    this.drawArea();
    this.drawRectangles();
    this.drawLegend();
  }

  clearCanvas() {
    const canvas = document.querySelector('canvas');
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  drawCircles() {
    this.circles = this.data[0]['circles'];
    this.ctx.strokeStyle = 'gray';
    this.ctx.lineWidth = 3;

    for (let i = 0; i < this.circles.length; i++) {
      this.ctx.beginPath();

      this.ctx.arc(
        this.circles[i].x,
        this.circles[i].y,
        this.circles[i].r,
        this.circles[i].startAngle,
        this.circles[i].endAngle * Math.PI,
        this.circles[i].counterclockwise
      );

      this.ctx.stroke();

      if (this.showNotes) {
        this.drawNote(
          this.circles[i].note,
          this.circles[i].x,
          this.circles[i].y
        );
      }
    }

    this.ctx.closePath();
  }

  drawLines() {
    this.lines = this.data[0]['lines'];
    this.ctx.lineWidth = 3;
    this.ctx.beginPath();

    for (let i = 0; i < this.lines.length; i++) {
      this.ctx.moveTo(this.lines[i].moveTo.x, this.lines[i].moveTo.y);
      this.ctx.lineTo(this.lines[i].lineTo.x, this.lines[i].lineTo.y);
      this.ctx.strokeStyle = 'brown';
      this.ctx.stroke();

      if (this.showNotes) {
        this.drawNote(
          this.lines[i].note,
          this.lines[i].moveTo.x + 5,
          this.lines[i].moveTo.y - 5
        );
      }
    }

    this.ctx.closePath();
  }

  drawRoads() {
    this.roads = this.data[0]['roads'];

    for (let i = 0; i < this.roads.length; i++) {
      this.ctx.shadowColor = '#808080';
      this.ctx.shadowBlur = 20;
      this.ctx.lineJoin = 'bevel';
      this.ctx.lineWidth = 3;
      this.ctx.fillStyle = '#C0C0C0';
      this.ctx.strokeStyle = '#606060';

      this.ctx.fillRect(
        this.roads[i].x,
        this.roads[i].y,
        this.roads[i].w,
        this.roads[i].h
      );

      this.ctx.strokeRect(
        this.roads[i].x,
        this.roads[i].y,
        this.roads[i].w,
        this.roads[i].h
      );

      if (this.showNotes) {
        this.drawNote(
          this.roads[i].note,
          this.roads[i].x + 5,
          this.roads[i].y - 5
        );
      }
    }
  }

  drawArea() {
    var x = 365;
    var y = 630;
    var w = 1030;
    var h = 500;
    var radius = 25;
    var r = x + w;
    var b = y + h;
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = 7;
    this.ctx.moveTo(x + radius, y);
    this.ctx.lineTo(r - radius, y);
    this.ctx.quadraticCurveTo(r, y, r, y + radius);
    this.ctx.lineTo(r, y + h - radius);
    this.ctx.quadraticCurveTo(r, b, r - radius, b);
    this.ctx.lineTo(x + radius, b);
    this.ctx.quadraticCurveTo(x, b, x, b - radius);
    this.ctx.lineTo(x, y + radius);
    this.ctx.quadraticCurveTo(x, y, x + radius, y);
    this.ctx.stroke();

    x = 710;
    y = 1130;
    w = 520;
    h = 110;
    radius = 5;
    r = x + w;
    b = y + h;
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'black';
    this.ctx.moveTo(x + radius, y);
    this.ctx.lineTo(r - radius, y);
    this.ctx.quadraticCurveTo(r, y, r, y + radius);
    this.ctx.lineTo(r, y + h - radius);
    this.ctx.quadraticCurveTo(r, b, r - radius, b);
    this.ctx.lineTo(x + radius, b);
    this.ctx.quadraticCurveTo(x, b, x, b - radius);
    this.ctx.lineTo(x, y + radius);
    this.ctx.quadraticCurveTo(x, y, x + radius, y);
    this.ctx.stroke();

    x = 415;
    y = 1130;
    w = 110;
    h = 40;
    radius = 5;
    r = x + w;
    b = y + h;
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'black';
    this.ctx.moveTo(x + radius, y);
    this.ctx.lineTo(r - radius, y);
    this.ctx.quadraticCurveTo(r, y, r, y + radius);
    this.ctx.lineTo(r, y + h - radius);
    this.ctx.quadraticCurveTo(r, b, r - radius, b);
    this.ctx.lineTo(x + radius, b);
    this.ctx.quadraticCurveTo(x, b, x, b - radius);
    this.ctx.lineTo(x, y + radius);
    this.ctx.quadraticCurveTo(x, y, x + radius, y);
    this.ctx.stroke();

    x = 340;
    y = 600;
    w = 1110;
    h = 785;
    radius = 50;
    r = x + w;
    b = y + h;
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'brown';
    this.ctx.moveTo(x + radius, y);
    this.ctx.lineTo(r - radius, y);
    this.ctx.quadraticCurveTo(r, y, r, y + radius);
    this.ctx.lineTo(r, y + h - radius);
    this.ctx.quadraticCurveTo(r, b, r - radius, b);
    this.ctx.lineTo(x + radius, b);
    this.ctx.quadraticCurveTo(x, b, x, b - radius);
    this.ctx.lineTo(x, y + radius);
    this.ctx.quadraticCurveTo(x, y, x + radius, y);
    this.ctx.stroke();
  }

  drawRectangles() {
    this.rectangles = this.data[0]['rectangles'];
    this.ctx.beginPath;
    this.ctx.lineWidth = 3;
    this.ctx.strokeStyle = '#0066CC';

    for (let i = 0; i < this.rectangles.length; i++) {
      if (i > 8) {
        this.ctx.strokeRect(
          this.rectangles[i].x,
          this.rectangles[i].y,
          this.rectangleHeight,
          this.rectangleWidth
        );

        if (this.places['A' + (i + 1)].occupancy_status)
          this.ctx.fillStyle = '#D9534F';
        else this.ctx.fillStyle = '#5CB85C';

        this.ctx.fillRect(
          this.rectangles[i].x,
          this.rectangles[i].y,
          this.rectangleHeight,
          this.rectangleWidth
        );
        this.drawParkNumber(
          i,
          this.rectangles[i].x + (this.rectangleHeight / 2) * 0.5,
          this.rectangles[i].y + this.rectangleWidth / 2
        );
      } else {
        this.ctx.strokeRect(
          this.rectangles[i].x,
          this.rectangles[i].y,
          this.rectangleWidth,
          this.rectangleHeight
        );

        if (this.places['A0' + (i + 1)].occupancy_status)
          this.ctx.fillStyle = '#D9534F';
        else this.ctx.fillStyle = '#5CB85C';

        this.ctx.fillRect(
          this.rectangles[i].x,
          this.rectangles[i].y,
          this.rectangleWidth,
          this.rectangleHeight
        );
        this.drawParkNumber(
          i,
          this.rectangles[i].x + (this.rectangleWidth / 2) * 0.5,
          this.rectangles[i].y + this.rectangleHeight / 2
        );
      }

      if (this.showNotes)
        this.drawNote(
          this.rectangles[i].note,
          this.rectangles[i].x,
          this.rectangles[i].y
        );
    }
  }

  drawParkNumber(i: number, x: number, y: number) {
    this.ctx.fillStyle = 'black';
    this.ctx.font = '18px serif';
    this.ctx.fillText('A' + ('0' + (i + 1)).slice(-2), x, y);
  }

  drawNote(note: string, x: number, y: number) {
    this.ctx.fillStyle = 'black';
    this.ctx.font = '18px serif';
    this.ctx.fillText(note, x, y);
  }

  drawLegend() {
    this.ctx.fillStyle = 'black';
    this.translateService
      .get('PARKING_SCHEMA.LEGEND_TITLE')
      .subscribe((tran: string) => this.ctx.fillText(tran, 1650, 30));
    this.ctx.fillStyle = 'black';
    this.translateService
      .get('PARKING_SCHEMA.OCCUPIED')
      .subscribe((tran: string) => this.ctx.fillText(tran, 1680, 65));
    this.ctx.beginPath;
    this.ctx.fillStyle = '#D9534F';
    this.ctx.fillRect(1650, 50, 20, 20);
    this.ctx.beginPath;
    this.ctx.fillStyle = '#5CB85C';
    this.ctx.fillRect(1650, 90, 20, 20);
    this.ctx.fillStyle = 'black';
    this.translateService
      .get('PARKING_SCHEMA.FREE')
      .subscribe((tran: string) => this.ctx.fillText(tran, 1680, 105));
  }
}
