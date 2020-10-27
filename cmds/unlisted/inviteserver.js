const Commando = require('discord.js-commando');
const dateformat = require('dateformat');

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

		var now2 = new Date();
		console.log(`${dateformat(now2, "yyyy-mm-dd' 'HH:MM:ss")} UTC > ${message.author.id} > ${message.content}`);
	}
};
