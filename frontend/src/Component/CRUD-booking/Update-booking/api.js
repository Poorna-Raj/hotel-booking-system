import axios from 'axios';

const baseURL = 'http://localhost:8082/booking-service/bookings';

export const updateBooking = (id, data) => {
  return axios.put(`${baseURL}/${id}`, data);
}