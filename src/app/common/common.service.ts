import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Place } from '../places/shared/place';
import { formatDate } from '@angular/common';
import { environment } from 'src/environments/environment';
import { Vacation } from '../places/shared/vacation';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  urlGetPlaces = 'get-places';
  urlGetParkNumber = 'get-park-number';
  urlAddVacation = 'add-vacation';

  constructor(private http: HttpClient) {}

  async getParkPlaces(period: string): Promise<Place[]> {
    let dateTime: any;
    if (period == 'actual' || period == '')
      dateTime = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en');
    else if (period == 'tomorrow') {
      let today = new Date();
      let tomorrow = new Date(today.setDate(today.getDate() + 1));
      dateTime = formatDate(tomorrow, 'yyyy-MM-dd 00:00:00', 'en');
    }

    try {
      const response = await this.http
        .get(
          environment.apiEndpoint +
            '/' +
            this.urlGetPlaces +
            '/selectDate/' +
            encodeURIComponent(dateTime),
          { observe: 'response' }
        )
        .toPromise();
      const data = [];
      const body = response.body as Place[];
      body.map((place) => {
        if (dateTime >= place.vacation_start && dateTime <= place.vacation_end)
          place.occupancy_status = false;
        else place.occupancy_status = true;
        data.push(new Place(place));
      });
      return data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getParkNumber(username: string): Promise<string> {
    try {
      const response = await this.http
        .get(
          environment.apiEndpoint +
            '/' +
            this.urlGetParkNumber +
            '/first_name/' +
            encodeURIComponent(username.split(' ')[0]) +
            '/last_name/' +
            encodeURIComponent(username.split(' ')[1]),
          { observe: 'response' }
        )
        .toPromise();
      return response.body as string;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async addVacation(vacation: Vacation): Promise<Vacation> {
    try {
      const response = await this.http
        .post(
          environment.apiEndpoint + '/' + this.urlAddVacation + '/',
          vacation,
          {
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache',
            },
          }
        )
        .toPromise()
        .then(this.extractData);
      // return new Vacation(response.body as Vacation);
    } catch (error) {
      return this.handleError(error);
    }
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

  private extractData(res: any) {
    let body = res;
    console.log(body);
    return body;
  }
}
