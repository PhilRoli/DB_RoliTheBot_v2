const Commando = require('discord.js-commando');

var time = new Date();
yellowOutput = '\033[33m';
resetOutput = '\u001B[0m';

module.exports = class DeleteCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'delete',
			group: 'moderation',
			aliases: [ 'del' ],
			memberName: 'delete',
			description: 'Deletes the given ammount of messages',
			clientPermissions: [ 'MANAGE_MESSAGES' ],
			userPermissions: [ 'MANAGE_MESSAGES' ],
			argsType: 'multiple'
		});
	}

	async run(message, args) {
		if (args.length !== 1) {
			message.channel.send(`Correct syntax: ${message.guild.commandPrefix}delete <1 - 99>`);
			return;
		}

		let times = 0;
		times = parseInt(args[0]);

		if (Number.isInteger(times) === true && times > 0 && times < 100) {
			times += 1;
			message.channel.messages.fetch({ limit: times }).then((messages) => {
				message.channel.bulkDelete(messages);

				console.log(
					`${yellowOutput}--${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}--${resetOutput}`
				);
				console.log(`${message.author.tag} used ${message.content}`);
			});
		} else {
			message.channel.send(`Wrong syntax. Please use: ${message.guild.commandPrefix}delete <1 - 99>`);
			return;
		}
	}
};
