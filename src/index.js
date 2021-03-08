import './css/styles.scss';
import './assets/evgeni-evgeniev-LPKk3wtkC-g-unsplash.jpg';
import APICaller from './apiCaller';
import CurrentUser from './CurrentUser';
import Hotel from './Hotel';

const userGreeting = document.querySelector('#user-greeting');
const accountTotal = document.querySelector('#account-total');
const roomList = document.querySelector('#room-list');
const roomSearchButton = document.querySelector('#room-search');
const searchDate = document.querySelector("#book-date");
const dateError = document.querySelector("#date-error");
const formBoxes = document.querySelectorAll("input[type='checkbox']");
const headsUp = document.querySelector("#heads-up");

const api = new APICaller();
let user;
let hotel;
const today = '2020/02/07';

const createUser = (userData) => {
  user = new CurrentUser(userData);
}

const createHotel = (roomData, bookingData) => {
  hotel = new Hotel(roomData, bookingData);
}

function buildUserDashboard() {
  userGreeting.innerText = `Hello ${user.getFirstName()}`;
  accountTotal.innerText = `Account total: $${hotel.getTotalSpent(user.id)}`
  buildBookingDeck(hotel.getAllBookings(user.id));
}

function buildBookingDeck(bookings) {
  bookings.forEach(booking => {
    roomList.innerHTML += buildBookingCard(booking);
  });
}

function buildBookingCard(booking) {
  const roomData = hotel.getRoomDetails([booking.roomNumber]);
  const bidet = (roomData[0].bidet) ? "Yup" : "Nope";
  return `
    <section class="roomCard">
      <h3>Room ${booking.roomNumber} - ${roomData[0].roomType}</h3>
      <h4>${booking.date}</h4>
    </section>`;
    //may need to add the booking ID to this block so they can be targeted later
};

function buildRoomDeck(rooms, date) {
  clearList();
  rooms.forEach(room => {
    roomList.innerHTML += buildRoomCard(room, date);
  });
}

function buildRoomCard(room, date) {
  //will need a booking button
  //will likely need to be targeted via bubbling
  const bidet = (room.bidet) ? "Yup" : "Nope";
    return `
      <section class="roomCard">
        <h3>Room ${room.number} - ${room.roomType}</h3>
        <h4>$${room.costPerNight} per night</h4>
        <ul class="roomFeatures">
          <li>Bed size: ${room.bedSize} </li>
          <li>Number of beds: ${room.numBeds}</li>
          <li>Bidet: ${bidet}</li>
        </ul>
        <button id="${room.number}-${date}">Book Now</button>
      </section>`
}

function pageLoad() {
  Promise.all([api.getOneCustomer(1), api.getAllRooms(), api.getAllBookings()])
    .then((allData) => {
      createUser(allData[0]);
      createHotel(allData[1].rooms, allData[2].bookings);
      buildUserDashboard();
    });
}

function bookRoom(targetId) {
  const bookingDetails = targetId.split('-');
  console.log(bookingDetails);
  const booking = {"userID": user.id, "date": bookingDetails[1], "roomNumber": parseInt(bookingDetails[0])};
  Promise.all([api.bookARoom(booking)])
    .then((bookingResponse) => {
    console.log(bookingResponse[0].message);
    addConfirmationCard(bookingResponse[0].message, bookingDetails)
    });
}

function roomSearch() {
  const date = formatDate(searchDate.value);
  derender(dateError);
  if (!date) {
    render(dateError);
    return;
  }

  const availableRooms = hotel.getAvailableRooms(date);
  const roomTypes = getFormInput();
  const searchResults = hotel.filterRoomList(availableRooms, roomTypes);

  if (!searchResults.length) {
    fierceApology();
  }

  updateHeadsUp(`Rooms available on ${searchDate.value}`);
  buildRoomDeck(searchResults, date);
}

function getFormInput() {
  const formKeys = Object.keys(formBoxes)
    return formKeys.reduce((roomTypes, key) => {
    if (formBoxes[key].checked) {
      roomTypes.push(formBoxes[key].id);
    }
    return roomTypes
  }, []);
}

function addConfirmationCard(message, bookingDetails) {
  clearList();
  const confirmation = `
  <section class="roomCard">
    <h2>Booking confirmed
    <h3>Room ${bookingDetails[0]} - ${bookingDetails[1]}</h3>
    <h4>${message}</h4>
    <button>Done</button>
  </section>`
  roomList.innerHTML += confirmation;
}

function formatDate(date) {
  return date.replaceAll('-','/');
}

function render(element) {
  element.classList.remove('noRender');
}

function derender(element) {
  element.classList.add('noRender');
}

function updateHeadsUp(message) {
  headsUp.innerText = message;
}

function fierceApology() {
  updateHeading("There are no rooms available for that day. We are sickened and disgraced by our failure and hope that one day you may find in your heart to forgive us. Please adjust your search and try again.");
}

function clearList() {
  roomList.innerHTML = '';
}

function resetSearchForm() {
  // return all search fields to empty or unchecked
}

// EVENT LISTENERS
window.addEventListener('load', pageLoad);
roomSearchButton.addEventListener('click', roomSearch);
roomList.addEventListener('click', function(event) {
  // console.log(event.target.id) });
  bookRoom(event.target.id) });
