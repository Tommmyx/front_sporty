import io from 'socket.io-client';
//import { SERVER_ADDRESS } from '@env';

const socket = io("http://192.93.212.210:8080", {reconnection: true});
export default socket;
