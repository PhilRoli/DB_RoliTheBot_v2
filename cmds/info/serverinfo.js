const Commando = require('discord.js-commando');
const Discord = require('discord.js');
const dateformat = require('dateformat');

module.exports = class EmbedCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'serverinfo',
			group: 'info',
			memberName: 'serverinfo',
			description: 'Replies with Info abut the current Server'
		});
	}

	async run(message) {
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
				},
				{
					name: "Server's Command Prefix",
					value: message.guild.commandPrefix,
					inline: true
				}
			);

		message.channel.send({ embed: embed });

		var now2 = new Date();
		console.log(`${dateformat(now2, "yyyy-mm-dd' 'HH:MM:ss")} UTC > ${message.author.id} > ${message.content}`);
	}
};
