/* eslint-disable import/extensions */

import { createRequire } from 'module';

import Request from './models/request.js';
import Room from './models/room.js';
import Reservation from './models/reservation.js';
import Hotel from './models/hotel.js';

// Workaround for importing local .json files when using ES modules
const require = createRequire(import.meta.url);
const roomsFromJSON = require('./provided-data/rooms.json');
const requestsFromJSON = require('./provided-data/requests.json');
const reservationsFromJSON = require('./provided-data/reservations.json');

// Create array of Room objects from JSON
const rooms = roomsFromJSON.map(
  (room) => new Room(
    room.id,
    room.num_beds,
    room.allow_smoking,
    room.daily_rate,
    room.cleaning_fee,
  ),
);

// Create array of Reservation objects from JSON
const existingReservations = reservationsFromJSON.map(
  (reservation) => new Reservation(
    reservation.room_id,
    reservation.checkin_date,
    reservation.checkout_date,
    reservation.total_charge,
  ),
);

// Create new Hotel object given rooms and existing reservations
const hotel = new Hotel(rooms, existingReservations);

/* For each request from the JSON, in order, create Request
   object and make reservation from the Request */
requestsFromJSON.forEach((requestFromJSON) => {
  const request = new Request(
    requestFromJSON.id,
    requestFromJSON.min_beds,
    requestFromJSON.is_smoker,
    requestFromJSON.checkin_date,
    requestFromJSON.checkout_date,
  );

  hotel.makeReservation(request);
});

// Get formatted array of current reservations
const currentReservations = hotel.viewCurrentReservations();

// Log answers to console
console.log(currentReservations);
