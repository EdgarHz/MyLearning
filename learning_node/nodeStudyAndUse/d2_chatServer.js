var net = require('net');

var chatServer = net.createServer(),
	clientList = [];


chatServer.on('connection', function(client) {
	client.name = client.remoteAddress + ':' + client.remotePort;
	client.write('Hi!\n');

	clientList.push(client);

	client.on('data', function(data){
		// console.log(data.toString());
		if (data.length > 0 ) {
			broadcast(data, client);
		}
	});

	client.on('end', function(data){
		clientList.splice(clientList.indexOf(client), 1);
	});
});

function broadcast(message, client) {
	var cleanup = [];
	for (var i = 0; i < clientList.length;  i+=1) {
		if (clientList[i] !== client) {
			if (clientList[i].writable) {
				clientList[i].write(client.name + " says " + message + '\n');
				
			} else {
				cleanup.push(clientList[i]);
				clientList[i].destory();
			}
		}
	}

}

chatServer.listen(9000);