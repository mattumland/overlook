class APICaller {
  constructor() {
    this.customer = 'http://localhost:3001/api/v1/customers';
    this.rooms = 'http://localhost:3001/api/v1/rooms';
    this.bookings = 'http://localhost:3001/api/v1/bookings';
  };

  getAllCustomers() {
    return fetch(this.customer)
   .then(response => response.json())
   .then(data => data);
 };

  getOneCustomer(id) {
    return fetch(this.customer + `/${id}`)
    .then(response => response.json())
    .then(data => data);
  };

  getAllRooms() {
    return fetch(this.rooms)
    .then(response => response.json())
    .then(data => data)
  };

  getAllBookings() {
    return fetch(this.bookings)
    .then(response => response.json())
    .then(data => data)
  };

  addBooking() {

  };

  deleteBooking() {

  };
};

export default APICaller;

// getSingleCustomer(this.singleCustomer, userId)
// getAllCustomers(this.allCustomer)
// getAllRooms(this.rooms)
// getAllBookings(this.bookings)
// addBooking(this.bookings)
// deleteBooking(this.bookings, id);
