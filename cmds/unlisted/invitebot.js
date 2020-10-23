const Commando = require('discord.js-commando');

var time = new Date();
yellowOutput = '\033[33m';
resetOutput = '\u001B[0m';

module.exports = class InviteBotCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'invitebot',
			group: 'unlisted',
			memberName: 'invitebot',
			description: 'Replies with the link to invite this bot to your server',
			userPermissions: [ 'ADMINISTRATOR' ]
		});
	}

	async run(message) {
		var inviteLink = '<:inviteLink:767856810090037308>';
		message.channel.send(
			`${inviteLink} https://discord.com/api/oauth2/authorize?client_id=766273088836861962&permissions=8&scope=bot ${inviteLink}`
		);

		console.log(`${yellowOutput}--${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}--${resetOutput}`);
		console.log(`${message.author.tag} used ${message.content}`);
	}
};
