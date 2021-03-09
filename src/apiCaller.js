class APICaller {
  constructor() {
    this.customer = 'http://localhost:3001/api/v1/customers';
    this.rooms = 'http://localhost:3001/api/v1/rooms';
    this.bookings = 'http://localhost:3001/api/v1/bookings';
  }

  getAllCustomers() {
    return fetch(this.customer)
      .then(response => {

        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .catch(err => console.log(err))
  }

  getOneCustomer(id) {
    return fetch(this.customer + `/${id}`)
      .then(response => {

        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .catch(err => console.log(err))
  }

  getAllRooms() {
    return fetch(this.rooms)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .catch(err => console.log(err))
  }

  getAllBookings() {
    return fetch(this.bookings)
      .then(response => {

        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .catch(err => console.log(err))
  }

  bookARoom(booking) {
    return fetch(this.bookings, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(booking)
    })
      .then(response => {

        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .catch(err => console.log(err))
  }

  deleteBooking() {

  }
}

export default APICaller;
