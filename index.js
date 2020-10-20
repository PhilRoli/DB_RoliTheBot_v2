const Discord = require('discord.js');
const dateformat = require('dateformat');
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

	// commands
	command(client, [ 'ping', 'test' ], (message) => {
		message.channel.send('Pong!');
	});

	command(client, 'servers', (message) => {
		var required = 'ADMINISTRATOR';
		if (message.member.hasPermission(required)) {
			client.guilds.cache.forEach((guild) => {
				message.channel.send(`${guild.name} has a totel of ${guild.memberCount} Members`);
			});
		} else {
			message.channel.send(`You are missing this permission: ${required}`);
		}
	});

	command(client, [ 'cc', 'clearChannel' ], (message) => {
		var required = 'ADMINISTRATOR';
		if (message.member.hasPermission(required)) {
			message.channel.messages.fetch().then((results) => {
				message.channel.bulkDelete(results);
			});
		} else {
			message.channel.send(`You are missing this permission: ${required}`);
		}
	});

	command(client, 'status', (message) => {
		var required = 'ADMINISTRATOR';
		if (message.member.hasPermission(required)) {
			const content = message.content.replace('!status ', '');
			client.user.setPresence({
				activity: {
					name: content,
					type: 0
				}
			});
		} else {
			message.channel.send(`You are missing this permission: ${required}`);
		}
	});

	command(client, 'serverinfo', (message) => {
		const logo = 'https://cdn.discordapp.com/avatars/433645584696475653/a_72cbe8a7de63f0458496e2b71a947d5e.gif';
		const creation = message.guild.createdAt;

		const embed = new Discord.MessageEmbed()
			.setTitle(message.guild.name)
			.setThumbnail(message.guild.iconURL())
			.setFooter(`Server Info requested by ${message.author.tag}`, logo)
			.setColor('#f42069')
			.addFields(
				{
					name: 'Members',
					value: message.guild.memberCount,
					inline: true
				},
				{
					name: 'Created',
					value: dateformat(creation, 'dddd, mmmm dS, yyyy, h:MM:ss'),
					inline: true
				},
				{
					name: 'Owner',
					value: message.guild.owner,
					inline: true
				},
				{
					name: 'Region',
					value: message.guild.region,
					inline: true
				},
				{
					name: 'Verified',
					value: message.guild.verified,
					inline: true
				}
			);

		message.channel.send(embed);
	});
});

client.login(config.token);
