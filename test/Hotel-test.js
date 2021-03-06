import chai from 'chai';
const expect = chai.expect;
import Hotel from '../src/Hotel';
import {roomData, bookingData} from '../test/hotel-test-data';

describe('Hotel', function() {
  describe('Initilize hotel', function() {
    it('should be a function', function() {
      expect(Hotel).to.be.a('function');
    });

    it('should be an instance of Hotel', function() {
      const hotel = new Hotel();
      expect(hotel).to.be.an.instanceof(Hotel);
    });

    it('should be able to hold room data', function() {
      const hotel = new Hotel(roomData.rooms);
      expect(hotel.rooms).to.equal(roomData.rooms);
    });

    it('should be able to hold booking data', function() {
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
      expect(hotel.getAllBookings(1)).to.deep.equal([{
          "id": "5fwrgu4i7k55hl6t8",
          "userID": 1,
          "date": "2020/02/05",
          "roomNumber": 12,
          "roomServiceCharges": []
        },
        {
          "id": "5fwrgu4i7k55hl6tf",
          "userID": 1,
          "date": "2020/01/25",
          "roomNumber": 2,
          "roomServiceCharges": []
        }
      ])

    });

    it('should return an array of rooms when given an array of room numbers', function() {
      expect(hotel.getRoomDetails([1, 2])).to.deep.equal([
      {
        "number": 1,
        "roomType": "residential suite",
        "bidet": true,
        "bedSize": "queen",
        "numBeds": 1,
        "costPerNight": 358.4
      }, {
        "number": 2,
        "roomType": "suite",
        "bidet": false,
        "bedSize": "full",
        "numBeds": 2,
        "costPerNight": 477.38
      }
    ])
  });

  it('should be able to return all dollars spent by a user', function() {
    expect(hotel.getTotalSpent(1)).to.equal(649.47);
    expect(hotel.getTotalSpent(2)).to.equal(999.33);
  });


  it('should be able to return a list of available rooms for a given date', function() {
    expect(hotel.getAvailableRooms('2020/02/05')).to.deep.equal(
      [{
          "number": 1,
          "roomType": "residential suite",
          "bidet": true,
          "bedSize": "queen",
          "numBeds": 1,
          "costPerNight": 358.4
        },
        {
          "number": 2,
          "roomType": "suite",
          "bidet": false,
          "bedSize": "full",
          "numBeds": 2,
          "costPerNight": 477.38
        },
        {
          "number": 3,
          "roomType": "single room",
          "bidet": false,
          "bedSize": "king",
          "numBeds": 1,
          "costPerNight": 491.14
        },
        {
          "number": 4,
          "roomType": "single room",
          "bidet": false,
          "bedSize": "queen",
          "numBeds": 1,
          "costPerNight": 429.44
        },
        {
          "number": 6,
          "roomType": "junior suite",
          "bidet": true,
          "bedSize": "queen",
          "numBeds": 1,
          "costPerNight": 397.02
        },
        {
          "number": 7,
          "roomType": "single room",
          "bidet": false,
          "bedSize": "queen",
          "numBeds": 2,
          "costPerNight": 231.46
        },
        {
          "number": 8,
          "roomType": "junior suite",
          "bidet": false,
          "bedSize": "king",
          "numBeds": 1,
          "costPerNight": 261.26
        },
        {
          "number": 9,
          "roomType": "single room",
          "bidet": true,
          "bedSize": "queen",
          "numBeds": 1,
          "costPerNight": 200.39
        },
        {
          "number": 10,
          "roomType": "suite",
          "bidet": false,
          "bedSize": "twin",
          "numBeds": 1,
          "costPerNight": 497.64
        },
        {
          "number": 11,
          "roomType": "single room",
          "bidet": true,
          "bedSize": "twin",
          "numBeds": 2,
          "costPerNight": 207.24
        },
        {
          "number": 13,
          "roomType": "single room",
          "bidet": false,
          "bedSize": "queen",
          "numBeds": 2,
          "costPerNight": 423.92
        },
        {
          "number": 14,
          "roomType": "residential suite",
          "bidet": false,
          "bedSize": "twin",
          "numBeds": 1,
          "costPerNight": 457.88
        },
        {
          "number": 15,
          "roomType": "residential suite",
          "bidet": false,
          "bedSize": "full",
          "numBeds": 1,
          "costPerNight": 294.56
        },
        {
          "number": 16,
          "roomType": "single room",
          "bidet": false,
          "bedSize": "full",
          "numBeds": 2,
          "costPerNight": 325.6
        },
        {
          "number": 17,
          "roomType": "junior suite",
          "bidet": false,
          "bedSize": "twin",
          "numBeds": 2,
          "costPerNight": 328.15
        },
        {
          "number": 18,
          "roomType": "junior suite",
          "bidet": false,
          "bedSize": "king",
          "numBeds": 2,
          "costPerNight": 496.41
        },
        {
          "number": 19,
          "roomType": "single room",
          "bidet": false,
          "bedSize": "queen",
          "numBeds": 1,
          "costPerNight": 374.67
        },
        {
          "number": 20,
          "roomType": "residential suite",
          "bidet": false,
          "bedSize": "queen",
          "numBeds": 1,
          "costPerNight": 343.95
        }
      ])
  });

  it('should be able to sort a room list by room number', function() {
    const roomList = [
      {
        "number": 10,
        "roomType": "suite",
        "bidet": false,
        "bedSize": "twin",
        "numBeds": 1,
        "costPerNight": 497.64
      },
      {
          "number": 2,
          "roomType": "suite",
          "bidet": false,
          "bedSize": "full",
          "numBeds": 2,
          "costPerNight": 477.38
      },
      {
        "number": 7,
        "roomType": "single room",
        "bidet": false,
        "bedSize": "queen",
        "numBeds": 2,
        "costPerNight": 231.46
      },
    ]
    expect(hotel.sortListByNumber(roomList)).to.deep.equal(
      [
        {
          "number": 2,
          "roomType": "suite",
          "bidet": false,
          "bedSize": "full",
          "numBeds": 2,
          "costPerNight": 477.38
        },
        {
          "number": 7,
          "roomType": "single room",
          "bidet": false,
          "bedSize": "queen",
          "numBeds": 2,
          "costPerNight": 231.46
        },
        {
          "number": 10,
          "roomType": "suite",
          "bidet": false,
          "bedSize": "twin",
          "numBeds": 1,
          "costPerNight": 497.64
        }
      ])
  });

  it('should be able to return a filtered array of room given an initial array and an array of room types', function() {
    const roomTypes1 = ['suite'];
    const roomTypes2 = ['single room', 'junior suite'];
    expect(hotel.filterRoomList(hotel.rooms, roomTypes1)).to.deep.equal(
      [{
          "number": 2,
          "roomType": "suite",
          "bidet": false,
          "bedSize": "full",
          "numBeds": 2,
          "costPerNight": 477.38
        },
        {
          "number": 10,
          "roomType": "suite",
          "bidet": false,
          "bedSize": "twin",
          "numBeds": 1,
          "costPerNight": 497.64
        }
      ]
    );

    expect(hotel.filterRoomList(hotel.rooms, roomTypes2)).to.deep.equal(
      [{
          "number": 3,
          "roomType": "single room",
          "bidet": false,
          "bedSize": "king",
          "numBeds": 1,
          "costPerNight": 491.14
        },
        {
          "number": 4,
          "roomType": "single room",
          "bidet": false,
          "bedSize": "queen",
          "numBeds": 1,
          "costPerNight": 429.44
        },
        {
          "number": 5,
          "roomType": "single room",
          "bidet": true,
          "bedSize": "queen",
          "numBeds": 2,
          "costPerNight": 340.17
        },
        {
          "number": 6,
          "roomType": "junior suite",
          "bidet": true,
          "bedSize": "queen",
          "numBeds": 1,
          "costPerNight": 397.02
        },
        {
          "number": 7,
          "roomType": "single room",
          "bidet": false,
          "bedSize": "queen",
          "numBeds": 2,
          "costPerNight": 231.46
        },
        {
          "number": 8,
          "roomType": "junior suite",
          "bidet": false,
          "bedSize": "king",
          "numBeds": 1,
          "costPerNight": 261.26
        },
        {
          "number": 9,
          "roomType": "single room",
          "bidet": true,
          "bedSize": "queen",
          "numBeds": 1,
          "costPerNight": 200.39
        },
        {
          "number": 11,
          "roomType": "single room",
          "bidet": true,
          "bedSize": "twin",
          "numBeds": 2,
          "costPerNight": 207.24
        },
        {
          "number": 12,
          "roomType": "single room",
          "bidet": false,
          "bedSize": "twin",
          "numBeds": 2,
          "costPerNight": 172.09
        },
        {
          "number": 13,
          "roomType": "single room",
          "bidet": false,
          "bedSize": "queen",
          "numBeds": 2,
          "costPerNight": 423.92
        },
        {
          "number": 16,
          "roomType": "single room",
          "bidet": false,
          "bedSize": "full",
          "numBeds": 2,
          "costPerNight": 325.6
        },
        {
          "number": 17,
          "roomType": "junior suite",
          "bidet": false,
          "bedSize": "twin",
          "numBeds": 2,
          "costPerNight": 328.15
        },
        {
          "number": 18,
          "roomType": "junior suite",
          "bidet": false,
          "bedSize": "king",
          "numBeds": 2,
          "costPerNight": 496.41
        },
        {
          "number": 19,
          "roomType": "single room",
          "bidet": false,
          "bedSize": "queen",
          "numBeds": 1,
          "costPerNight": 374.67
        },
      ])
    });
  });
});
