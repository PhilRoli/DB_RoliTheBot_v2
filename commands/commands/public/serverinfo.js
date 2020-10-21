const Discord = require('discord.js');
const dateformat = require('dateformat');

module.exports = {
	commands: 'serverinfo',
	minArgs: 0,
	maxArgs: 0,
	description: 'Replies with info about the current server',
	callback: (message, arguments, text) => {
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
	},
};
