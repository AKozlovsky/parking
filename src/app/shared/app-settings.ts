export class AppSettings {
  static title = 'Parking';
  static version = '1.0.3';
  static copyright = '@ 2020 Andrej Kozlovsky, spol. s r.o.';

  static translate = {
    languages: ['cs'],
    defaultLanguage: 'cs',
  };

  static columns = {
    places_admin: [
      'park_number',
      'first_name',
      'last_name',
      'vacation_start',
      'vacation_end',
      'occupancy_status',
      'action',
    ],
    places: [
      'park_number',
      'first_name',
      'last_name',
      'vacation_start',
      'vacation_end',
      'occupancy_status',
    ],
  };

  static defaultTokenExpirationOffset = 600;
  static defaultProgressBarColor = 'warn';
  static defaultPageSize = 10;
  static defaultPageSizeOptions = [5, 10, 15, 20];
  static desktopSize = 960;
  static refreshInterval = 300000;

  static storageNames = {
    places: {
      pageSize: 'places-page-size',
      pageIndex: 'places-page-index',
    },
    tokens: [{ key: 'default', name: 'token' }],
    user: 'user',
  };
}
