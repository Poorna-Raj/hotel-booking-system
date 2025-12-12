import axios from 'axios';

const API_URL = 'http://localhost:8081/room-service/rooms';

export const getRoomById = (id) => {
  return axios.get(`${API_URL}/${id}`);
}