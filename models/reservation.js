import { isValid, parseISO } from 'date-fns';

export default class Reservation {
  constructor(roomID, checkInDate, checkOutDate, totalCharge) {
    this.roomID = roomID;
    // If checkInDate is not already a valid Date object, parse it into one
    this.checkInDate = isValid(checkInDate)
      ? checkInDate
      : parseISO(checkInDate);
    this.checkOutDate = isValid(checkOutDate)
      ? checkOutDate
      : parseISO(checkOutDate);
    this.totalCharge = totalCharge;
  }
}
