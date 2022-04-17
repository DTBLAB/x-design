import io from '@hyoga/uni-socket.io';
import baseConfig from '../config/index';


class MySocket{
	static socket = null;
	
	static connect(){
		if(!MySocket.socket){
			MySocket.socket = io(baseConfig.uploadBaseUrl, {
				query: {},
				// transports: [ 'websocket', 'polling' ],
				transports: [ 'websocket'],
				timeout: 5000,
				path: '/upload/socket.io'
			});
		}
	}
	
	static disconncet(){
		MySocket.disconnect();
	}
	
	
}

module.exports = MySocket;