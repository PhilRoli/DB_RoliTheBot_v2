const Commando = require('discord.js-commando');

var time = new Date();
yellowOutput = '\033[33m';
resetOutput = '\u001B[0m';

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
		});
		message.channel.send(serverlist);

		console.log(`${yellowOutput}--${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}--${resetOutput}`);
		console.log(`${message.author.tag} used ${message.content}`);
	}
};
