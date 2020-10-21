module.exports = {
	commands: 'ping',
	description: 'Replies woth the ping of the Bot & API',
	callback: (message, arguments, text, client) => {
		message.channel.send('Calculating Ping...').then((resultMessage) => {
			const ping = resultMessage.createdTimestamp - message.createdTimestamp;

			resultMessage.edit(`Bot latency: ${ping}ms, API latency: ${client.ws.ping}ms`);
		});
	}
};
