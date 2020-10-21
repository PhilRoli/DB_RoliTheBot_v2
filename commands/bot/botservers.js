const { Message } = require('discord.js');

module.exports = {
	commands: 'servers',
	permissionError: 'You need Admin permission to execute this command',
	minArgs: 0,
	maxArgs: 0,
	callback: (message, arguments, text) => {
		client.guilds.cache.forEach((guild) => {
			message.channel.send(`${guild.name} has a totel of ${guild.memberCount} Members`);
		});
	},
	permissions: [ 'ADMINISTRATOR' ]
};
