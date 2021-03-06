class Hotel {
  constructor(roomData, bookingData) {
    this.rooms = roomData;
    this.bookings = bookingData;
  }

  getRoomDetails(roomNumbers) {
    return this.rooms.filter(room => roomNumbers.includes(room.number));
  };

  getAllBookings(userID) {
    return this.bookings.filter(booking => booking.userID === userID);
  };

  getTotalSpent(userID) {
    const roomNumbers = this.getAllBookings(userID).map(booking => booking.roomNumber);
    const sum = this.getRoomDetails(roomNumbers).reduce((sumSpent, room) => {
      sumSpent += room.costPerNight;
      return sumSpent;
    }, 0);
    return parseFloat(sum.toFixed(2));
  };

  getAvailableRooms(date) {
    const bookedRoomNumbers = this.bookings.filter(booking => booking.date === date).map(room => room.roomNumber);
    const availableRoomsNumbers = this.rooms.filter(room => !bookedRoomNumbers.includes(room.number)).map(room => room.number);
    return this.getRoomDetails(availableRoomsNumbers);
  };

  filterRoomList(roomList, roomTypes) {

  };

}


/*
getAllBookings(userid) => array of bookings by given User

getTotalSpent(userid) => number of $ spend by given User

getRoomDetails(array of room numbers) => array of room objects (use to populate current display to show the results of a search or filter)

getAvailableRooms(date string) = array of bookings w/o bookings on the given date

filterRoomList(array of rooms, array of roomTypes) => array of rooms


*/


export default Hotel;
