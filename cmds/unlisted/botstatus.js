const Commando = require('discord.js-commando');
const dateformat = require('dateformat');

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

		if (args === '') {
			message.channel.send(`Correct Syntax: ${message.guild.commandPrefix}botstatus <new status>`);
			return;
		}

		message.client.user.setPresence({
			activity: {
				name: status,
				type: 0
			}
		});
		message.channel.send(`Set the Bot's status to ${status}`);

		var now2 = new Date();
		console.log(`${dateformat(now2, "yyyy-mm-dd' 'HH:MM:ss")} UTC > ${message.author.id} > ${message.content}`);
	}
};
