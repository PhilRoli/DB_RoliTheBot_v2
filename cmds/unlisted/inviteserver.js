const Commando = require('discord.js-commando');

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
	}
};
