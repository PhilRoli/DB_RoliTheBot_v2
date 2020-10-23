const Commando = require('discord.js-commando');

var time = new Date();
yellowOutput = '\033[33m';
resetOutput = '\u001B[0m';

module.exports = class BotStatusCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'botstatus',
			group: 'unlisted',
			memberName: 'botstatus',
			description: 'Sets the Bots status to the given string',
			userPermissions: [ 'ADMINISTRATOR' ]
		});
	}

	async run(message, args) {
		const status = args;
		message.client.user.setPresence({
			activity: {
				name: status,
				type: 0
			}
		});
		message.channel.send(`Set the Bot's status to ${status}`);

		console.log(`${yellowOutput}--${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}--${resetOutput}`);
		console.log(`${message.author.tag} used ${message.content}`);
	}
};
