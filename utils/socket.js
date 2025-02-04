import io from 'socket.io-client';
import { SERVER_ADDRESS } from '@env';

const socket = io(SERVER_ADDRESS, {reconnection: true});
export default socket;
