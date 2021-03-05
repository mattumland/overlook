class apiCaller {
  constructor() {
    this.customer = 'http://localhost:3001/api/v1/customers';
    this.rooms = 'http://localhost:3001/api/v1/rooms';
    this.bookings = 'http://localhost:3001/api/v1/bookings';
  };

  getAllCustomers() {
    return fetch(this.customer)
   .then(response => response.json())
   // .then(data)
 };

  getALlCustomers() {
    return 'eat some pizza';
  }

  // getSingleCustomer(this.singleCustomer, userId)
  // getAllCustomers(this.allCustomer)
  // getAllRooms(this.rooms)
  // getAllBookings(this.bookings)
  // addBooking(this.bookings)
  // deleteBooking(this.bookings, id);
  scripts
  const customerPromise = apiCaller.getAllCustomers()
  Promise.all([customerPromise]);
};
