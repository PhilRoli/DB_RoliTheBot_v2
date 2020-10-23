const Commando = require('discord.js-commando');

var time = new Date();
greenOutput = '\033[32m';
resetOutput = '\u001B[0m';

module.exports = class PingCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'ping',
			group: 'public',
			memberName: 'ping',
			description: 'Replies with the Ping of the Bot & API'
		});
	}

	async run(message) {
		message.channel.send('Calculating Ping...').then((resultMessage) => {
			const ping = resultMessage.createdTimestamp - message.createdTimestamp;

			resultMessage.edit(`Bot latency: ${ping}ms, API latency: ${message.client.ws.ping}ms`);
		});

		console.log(`${greenOutput}--${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}--${resetOutput}`);
		console.log(`${message.author.tag} used ${message.content}`);
	}
};
