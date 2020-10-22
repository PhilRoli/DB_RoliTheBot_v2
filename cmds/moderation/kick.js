const Commando = require('discord.js-commando');

module.exports = class KickComamnd extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'kick',
			group: 'moderation',
			memberName: 'kick',
			description: 'Kicks a member from the Server',
			clientPermissions: [ 'KICK_MEMBERS' ],
			userPermissions: [ 'KICK_MEMBERS' ]
		});
	}

	async run(message) {
		const target = message.mentions.users.first();
		if (!target) {
			message.channel.send('Please specify someone to kick');
			return;
		}

		const { guild } = message;

		const member = guild.members.cache.get(target.id);

		if (member.kickable) {
			member.kick();
			message.channel.send('The user has been kicked!');
		} else {
			message.channel.send('I cannot kick this user');
		}
	}
};
