class Hotel {
  constructor(roomData, bookingData) {
    this.rooms = roomData;
    this.bookings = bookingData;
  }

  getRoomDetails(roomNumbers) {
    return this.rooms.filter(room => roomNumbers.includes(room.number));
  }

  getAllBookings(userID) {
    return this.bookings.filter(booking => booking.userID === userID);
  }

  getTotalSpent(userID) {
    const roomNumbers = this.getAllBookings(userID).map(booking => booking.roomNumber);
    const sum = this.getRoomDetails(roomNumbers).reduce((sumSpent, room) => {
      sumSpent += room.costPerNight;
      return sumSpent;
    }, 0);
    return parseFloat(sum.toFixed(2));
  }

  getAvailableRooms(date) {
    const bookedRoomNumbers = this.bookings.filter(booking => booking.date === date).map(room => room.roomNumber);
    const availableRoomsNumbers = this.rooms.filter(room => !bookedRoomNumbers.includes(room.number)).map(room => room.number);
    return this.getRoomDetails(availableRoomsNumbers);
  }

  filterRoomList(roomList, roomTypes) {
    if (roomTypes.length === 0) {
      roomTypes = ['single room', 'suite', 'residential suite', 'junior suite'];
    }
    const result = roomTypes.reduce((list, type) => {
      const thisType = roomList.filter(room => room.roomType === type);
      list = list.concat(thisType);
      return list;
    }, []);
    return this.sortListByNumber(result);
  }

  sortListByNumber(roomList) {
    return roomList.sort((roomA, roomB) => roomA.number - roomB.number);
  }

}

export default Hotel;
