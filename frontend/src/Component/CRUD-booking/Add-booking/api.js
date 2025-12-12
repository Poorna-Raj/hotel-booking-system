import axios from 'axios';

const API_URL = 'http://localhost:8082/booking-service/bookings';

export const addNewBooking = (data) => {
  return axios.post(API_URL, data);
}