import './css/base.scss';

import APICaller from './APICaller';

const api = new APICaller();


let someData;

Promise.all([api.getAllCustomers(), api.getOneCustomer(12), api.getAllRooms()])
  .then((allData) => {
    someData = allData[0].customers;
    console.log(someData);
  });


window.addEventListener('load', doSomeStuff)

function doSomeStuff() {
  showSomeData();
}

function showSomeData() {
    console.log(someData);
}
