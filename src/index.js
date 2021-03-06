import './css/base.scss';
import APICaller from './APICaller';

import './images/turing-logo.png'

const api = new APICaller();

console.log(api.getAllCustomers());
console.log(api.getOneCustomer(40));
console.log(api.getAllRooms());
console.log(api.getAllBookings());

Promise.all([api.getAllCustomers(), api.getOneCustomer(12), api.getAllRooms()])
  .then((allData) => {
    console.log(allData[0].customers);
  });
