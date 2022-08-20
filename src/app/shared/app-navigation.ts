import { Navigation } from 'common-components';

export class AppNavigations {
  static modules = [
    new Navigation({ name: 'PLACES.TITLE', url: '/places', icon: 'folder' }),
    new Navigation({
      name: 'VACATION.NAV_TITLE',
      url: '/vacation',
      icon: 'folder',
    }),
  ];
  static application = [];
}
