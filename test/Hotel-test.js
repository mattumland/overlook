import chai from 'chai';
const expect = chai.expect;
import Hotel from 'src/Hotel.js';
import roomData from 'test/hotel-test-data.js';
import bookingData from 'test/hotel-test-data.js';

describe('Hotel', function() {
  describe('Initilize hotel', function () {
    it('should be a function', function() {
      expect(Hotel).to.be.a('function');
    });

    it('should be an instance of Hotel', function() {
      const hotel = new Hotel();
      expect(hotel).to.be.an.instanceof(Hotel);
    });

    it('should be able to hold room data'), function() {
      const hotel = new Hotel(roomData.rooms);
      expect(hotel.rooms).to.equal(roomData.rooms);
    });

    it('should be able to hold booking data'), function() {
      const hotel = new Hotel(roomData.rooms, bookingData.bookings);
      expect(hotel.rooms).to.equal(roomData.rooms);
      expect(hotel.bookings).to.equal(bookingData.bookings);
    });
  });

  describe('Hotel methods', function() {
    let hotel;
    beforeEach(function() {
      hotel = new Hotel(roomData.rooms, bookingData.bookings);
    });

    it('should be able to return all of a user`s bookings', function() {

    });

    it('should be able to return all dollars spent by a user', function() {

    });

    it('should be able to return a list of available rooms for a given date', function() {

    });

    it('should be able to return a list of available rooms for a given date', function() {

    });

    it('should return an array of rooms when given an array of bookings', function() {

    });

  });
});
