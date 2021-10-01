import { differenceInCalendarDays, parseISO } from 'date-fns';

export default class Request {
  constructor(id, minBeds, isSmoker, checkInDate, checkOutDate) {
    this.id = id;
    this.minBeds = minBeds;
    this.isSmoker = isSmoker;
    this.checkInDate = parseISO(checkInDate);
    this.checkOutDate = parseISO(checkOutDate);
    this.stayLengthInDays = differenceInCalendarDays(
      this.checkOutDate,
      this.checkInDate,
    );
  }
}
