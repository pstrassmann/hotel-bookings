/* eslint-disable import/extensions */

import { formatISO, isAfter, isBefore } from 'date-fns';
import Reservation from './reservation.js';

export default class Hotel {
  constructor(rooms, reservations) {
    this.rooms = rooms;
    this.reservations = reservations;
  }

  /**
     * Get list of all available rooms for the provided date range
     * @param {date} checkInDate
     * @param {date} checkOutDate
     * @returns {Room[]}
     */
  getAvailableRooms(checkInDate, checkOutDate) {
    const overlappingReservations = this.reservations.filter((reservation) => {
      const datesOverlap = isBefore(checkInDate, reservation.checkOutDate)
                && isAfter(checkOutDate, reservation.checkInDate);

      return datesOverlap;
    });

    const unavailableRoomIds = overlappingReservations.map(
      (reservation) => reservation.roomID,
    );

    const availableRooms = this.rooms.filter(
      (room) => !unavailableRoomIds.includes(room.id),
    );
    return availableRooms;
  }

  /**
     * Gets the cheapeast matching and available room given the request
     * @param {Request} request
     * @returns {Room} room
     */
  getCheapestMatchingAndAvailableRoom(request) {
    const availableRooms = this.getAvailableRooms(
      request.checkInDate,
      request.checkOutDate,
    );

    const matchingAndAvailableRooms = availableRooms.filter((room) => (
      request.minBeds <= room.numBeds
            && request.isSmoker === room.allowSmoking
    ));

    const cheapestMatchingAndAvailableRoom = matchingAndAvailableRooms.reduce(
      (prevRoom, currentRoom) => (prevRoom.calculateTotalCharge(request.stayLengthInDays)
            < currentRoom.calculateTotalCharge(request.stayLengthInDays)
        ? prevRoom
        : currentRoom),
    );

    return cheapestMatchingAndAvailableRoom;
  }

  /**
     * Add cheapest matching and available room to hotel's reservations array
     * @param {Request} request
     */
  makeReservation(request) {
    const room = this.getCheapestMatchingAndAvailableRoom(request);

    const newReservation = new Reservation(
      room.id,
      request.checkInDate,
      request.checkOutDate,
      room.calculateTotalCharge(request.stayLengthInDays),
    );

    this.reservations.push(newReservation);
  }

  /**
     * Convert hotels reservations object array to format in reservations.json
     * @returns {Object[]}
     */
  viewCurrentReservations() {
    const formattedReservations = this.reservations.map((reservation) => ({
      room_id: reservation.roomID,
      checkin_date: formatISO(reservation.checkInDate, {
        representation: 'date',
      }),
      checkout_date: formatISO(reservation.checkOutDate, {
        representation: 'date',
      }),
      total_charge: reservation.totalCharge,
    }));

    return formattedReservations;
  }
}
