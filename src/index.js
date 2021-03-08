import './css/styles.scss';
import './assets/evgeni-evgeniev-LPKk3wtkC-g-unsplash.jpg';
import APICaller from './APICaller';
import CurrentUser from './CurrentUser';
import Hotel from './Hotel';

const userGreeting = document.querySelector('#user-greeting');
const accountTotal = document.querySelector('#account-total');
const roomList = document.querySelector('#room-list');
const roomSearchButton = document.querySelector('#room-search');
const searchDate = document.querySelector("#book-date");
const formBoxes = document.querySelectorAll("input[type='checkbox']");

const api = new APICaller();
let user;
let hotel;

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
    // <ul class="roomFeatures">
    //   <li>Bed size: ${roomData[0].bedSize} </li>
    //   <li>Number of beds: ${roomData[0].numBeds}</li>
    //   <li>Bidet: ${bidet}</li>
    // </ul>
};

function buildRoomDeck() {

}

function buildRoomCard() {
//probably needs to include
}

function pageLoad() {
  Promise.all([api.getOneCustomer(1), api.getAllRooms(), api.getAllBookings()])
    .then((allData) => {
      createUser(allData[0]);
      createHotel(allData[1].rooms, allData[2].bookings);
      buildUserDashboard();
    });
}

function roomSearch() {
  console.log(formatDate(searchDate.value));
  const availableRooms = hotel.getAvailableRooms(searchDate.value);
  const roomTypes = getFormInput();
  const searchResults = hotel.filterRoomList(availableRooms, roomTypes);
  console.log(searchResults);
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

function formatDate(date) {
  return date.replaceAll('-','/');
}

function resetSearchForm() {
  // return all search fields to empty or unchecked
}

// EVENT LISTENERS
window.addEventListener('load', pageLoad);
roomSearchButton.addEventListener('click', roomSearch);
