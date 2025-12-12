import axios from 'axios';

const API_URL = 'http://localhost:8082/booking-service/bookings';

export const getAllBookings = () => {
  return axios.get(API_URL);
}