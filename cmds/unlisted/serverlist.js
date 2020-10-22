const Commando = require('discord.js-commando');

module.exports = class ServerListCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'serverlist',
			group: 'unlisted',
			memberName: 'serverlist',
			description: 'Replies with all Servers the bot is in & their Member count',
			userPermissions: [ 'ADMINISTRATOR' ]
		});
	}

	async run(message) {
		var serverlist = '\n**Server List**\n';
		message.client.guilds.cache.forEach((guild) => {
			serverlist += `"${guild.name}" has a total of ${guild.memberCount} Members\n`;
			console.log(serverlist);
		});
		message.channel.send(serverlist);
	}
};
