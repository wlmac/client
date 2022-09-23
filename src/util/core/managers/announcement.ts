import Announcement from '../interfaces/announcement';
import Routes from '../misc/routes';
import SessionManager, { RequestMethod } from './session';

export default class AnnouncementManager {
  private session;
  private cache = new Map<number, Announcement>();

  constructor(session: SessionManager) {
    this.session = session;
  }

  loadAnnouncements(count: number, startFrom: number) {
    this.session
      .request(`${Routes.POST.ANNOUNCEMENT}?limit=${count}&offset=${startFrom}`, {}, RequestMethod.GET, false)
      .then((res) => {
        //yoink into cache
      })
      .catch(() => {});
  }
}
