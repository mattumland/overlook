import './css/styles.scss';
// import './assets/evgeni-evgeniev-LPKk3wtkC-g-unsplash.jpg';
// import image from './assets/overlook-logo-01.png';
import APICaller from './apiCaller';
import CurrentUser from './CurrentUser';
import Hotel from './Hotel';

const userCard = document.querySelector('#user-card');
const userGreeting = document.querySelector('#user-greeting');
const accountTotal = document.querySelector('#account-total');
const todayDate = document.querySelector('#today')
const roomList = document.querySelector('#room-list');
const roomSearchButton = document.querySelector('#room-search');
const searchDate = document.querySelector("#book-date");
const dateError = document.querySelector("#date-error");
const formBoxes = document.querySelectorAll("input[type='checkbox']");
const headsUp = document.querySelector("#heads-up");
const roomCard = document.querySelector("#room-card");
const loginCard = document.querySelector('#login-card');
const loginButton = document.querySelector("#login");
const nameInput = document.querySelector('#user-name');
const nameError = document.querySelector("#name-error");
const passwordLogin = document.querySelector('#password');
const passwordMissing = document.querySelector('#password-missing');
const passwordError = document.querySelector('#password-error');
const grid = document.querySelector('#grid');

const api = new APICaller();
const today = '2020-02-07';
const password = 'overlook2021';
let user = null;
let hotel = null;

const createUser = (userData) => {
  user = new CurrentUser(userData);
}

const createHotel = (roomData, bookingData) => {
  hotel = new Hotel(roomData, bookingData);
}

function login() {
  if (!nameInput.value) {
    render(nameError);
    return;
  }
  else if (!passwordLogin.value) {
    render(passwordMissing);
    return;
  } else if (!(passwordLogin.value === password)) {
    render(passwordError);
    return;
  }
  const userID = parseInt(nameInput.value.slice(8));
  searchDate.min = `${today}`;
  todayDate.innerText = `${today}`;
  pageLoad(userID);
}

function pageLoad(userID) {
  derender(loginCard);
  Promise.all([api.getOneCustomer(userID), api.getAllRooms(), api.getAllBookings()])
    .then((allData) => {
      updateHeadsUp('Your Reservations')
      createUser(allData[0]);
      createHotel(allData[1].rooms, allData[2].bookings);
      buildUserDashboard();
      render(userCard);
      render(grid);
    });
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
};

function buildRoomDeck(rooms, date) {
  clearList();
  rooms.forEach(room => {
    roomList.innerHTML += buildRoomCard(room, date);
  });
}

function buildRoomCard(room, date) {
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

function bookRoom(targetId) {
  const bookingDetails = targetId.split('-');
  const booking = {"userID": user.id, "date": bookingDetails[1], "roomNumber": parseInt(bookingDetails[0])};
  Promise.all([api.bookARoom(booking)])
    .then((bookingResponse) => {
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
    return;
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
    <h2>Booking confirmed<h2>
    <h3>Room ${bookingDetails[0]} - ${bookingDetails[1]}</h3>
    <h4>${message}</h4>
    <button id='home'>Done</button>
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
  clearList();
  updateHeadsUp("Oops");
  const apology = `
    <section class="roomCard">
      <h2>We're really sorry<h2>
      <h3>There are no rooms available for that day. We are sickened and disgraced by our failure and hope that one day you may find in your heart to forgive us.</h3>
      <h4>Please adjust your search and try again<h4>
  `
  roomList.innerHTML += apology;
}

function clearList() {
  roomList.innerHTML = '';
}

// EVENT LISTENERS
loginButton.addEventListener('click', login)
roomSearchButton.addEventListener('click', roomSearch);
roomList.addEventListener('click', function(event) {
  if (!event.target.id) {
    return
  } else if (event.target.id === 'home') {
    clearList();
    pageLoad(user.id);
  } else {
    bookRoom(event.target.id)
    }
  });
