const Commando = require('discord.js-commando');

var time = new Date();
greenOutput = '\033[32m';
resetOutput = '\u001B[0m';

module.exports = class InviteBotCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'inviteserver',
			group: 'unlisted',
			memberName: 'inviteserver',
			description: 'Replies with the link to invite to the test server',
			userPermissions: [ 'ADMINISTRATOR' ]
		});
	}

	async run(message) {
		var inviteLink = '<:inviteLink:767856810090037308>';
		message.channel.send(`${inviteLink} https://discord.gg/2TNfDaX ${inviteLink}`);

		console.log(`${greenOutput}--${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}--${resetOutput}`);
		console.log(`${message.author.tag} used ${message.content}`);
	}
};
