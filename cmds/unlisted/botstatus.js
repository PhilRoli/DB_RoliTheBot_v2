const Commando = require('discord.js-commando');

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
        message.channel.send(`Set the Bot's status to ${status}`)
	}
};
