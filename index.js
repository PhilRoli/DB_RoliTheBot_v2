const Discord = require('discord.js');
const client = new Discord.Client();
var time = new Date();

const config = require('./config.json');
const command = require('./commands');
const firstMessage = require('./first-message');

// commands
const memberCount = require('./member-count');

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	console.log('Start at ' + time.getMinutes() + ':' + time.getSeconds());
	console.log(' ');
	client.user.setActivity('!commands for help');
	memberCount(client);

	firstMessage(client, '700325966081425419', 'Is the Bot working?', [ '✔️', '❌' ]);

	// commands
	command(client, [ 'ping', 'test' ], (message) => {
		message.channel.send('Pong!');
	});

	command(client, 'servers', (message) => {
		client.guilds.cache.forEach((guild) => {
			message.channel.send(`${guild.name} has a totel of ${guild.memberCount} Members`);
		});
	});

	command(client, [ 'cc', 'clearChannel' ], (message) => {
		if (message.member.hasPermission('ADMINISTRATOR')) {
			message.channel.messages.fetch().then((results) => {
				message.channel.bulkDelete(results);
			});
		}
	});

	command(client, 'status', (message) => {
		const content = message.content.replace('!status ', '');
		client.user.setPresence({
			activity: {
				name: content,
				type: 0
			}
		});
	});
});

client.login(config.token);
