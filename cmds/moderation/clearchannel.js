const Commando = require('discord.js-commando');

var time = new Date();
yellowOutput = '\033[33m';
resetOutput = '\u001B[0m';

module.exports = class ClearChannelCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'clearchannel',
			group: 'moderation',
			aliases: [ 'cc', 'clearchannel' ],
			memberName: 'clearchannel',
			description: 'deletes all messages under 14 days old',
			clientPermissions: [ 'MANAGE_MESSAGES' ],
			userPermissions: [ 'MANAGE_MESSAGES' ]
		});
	}

	async run(message) {
		message.channel.messages.fetch().then((results) => {
			message.channel.bulkDelete(results);

			console.log(
				`${yellowOutput}--${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}--${resetOutput}`
			);
			console.log(`${message.author.tag} used ${message.content}`);
		});
	}
};
