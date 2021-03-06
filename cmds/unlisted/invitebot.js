const Commando = require('discord.js-commando');
const dateformat = require('dateformat');

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

		var now2 = new Date();
		console.log(`${dateformat(now2, "yyyy-mm-dd' 'HH:MM:ss")} UTC > ${message.author.id} > ${message.content}`);
	}
};
