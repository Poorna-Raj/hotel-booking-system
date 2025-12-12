import axios from 'axios';

const API_URL = 'http://localhost:8081/room-service/rooms';

export const getRoomById =
    (id) => {
      return axios.get(`${API_URL}/${id}`);
    }

export const updateRoomById = (id, data) => {
  return axios.put(
      `${API_URL}/${id}?userId=3`, data,
      {headers: {'Content-Type': 'application/json'}});
}