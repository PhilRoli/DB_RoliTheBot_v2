const Commando = require('discord.js-commando');

module.exports = class slowmodeCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'slowmode',
			group: 'moderation',
			aliases: [ 'slow' ],
			memberName: 'slowmode',
			description: 'Puts a channel into slowmode',
			userPermissions: [ 'ADMINISTRATOR' ],
			argsType: 'multiple'
		});
	}

	run = async (message, args) => {
		const { guild, channel } = message;

		if (args.length < 1) {
			message.channel.send(`Correct Syntax: ${guild.commandPrefix}slow <seconds / off> <optional: reason>`);
			return;
		}

		let duration = args.shift().toLowerCase();

		if (duration === 'off') {
			duration = 0;
		}

		if (isNaN(duration)) {
			message.channel.send(`Correct Syntax: ${guild.commandPrefix}slow <seconds / off> <optional: reason>`);
			return;
		}

		channel.setRateLimitPerUser(duration, args.join(' '));
	};
};
