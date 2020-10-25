const Commando = require('discord.js-commando');

module.exports = class simJoinCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'simjoin',
			group: 'testing',
			aliases: [ 'sj' ],
			memberName: 'simjoin',
			description: 'Simulates a join',
			userPermissions: [ 'ADMINISTRATOR' ]
		});
	}

	run = (message) => {
		this.client.emit('guildMemberAdd', message.member);
	};
};
