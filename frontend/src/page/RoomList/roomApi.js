import axios from 'axios';

const API_URL = 'http://localhost:8081/room-service/rooms';

export const createRoom =
    (data) => {
      return axios.post(
          API_URL, data, {headers: {'Content-Type': 'application/json'}});
    }

export const getRooms = () => {
  return axios.get(API_URL);
}