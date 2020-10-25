const Commando = require('discord.js-commando');

module.exports = class simLeaveCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'simleave',
			group: 'testing',
			aliases: [ 'sl' ],
			memberName: 'simleave',
			description: 'Simulates a leave',
			userPermissions: [ 'ADMINISTRATOR' ]
		});
	}

	run = (message) => {
		this.client.emit('guildMemberLeave', message.member);
	};
};
