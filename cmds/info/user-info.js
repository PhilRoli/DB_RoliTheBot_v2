const Commando = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const dateformat = require('dateformat');

module.exports = class UserInfoCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'userinfo',
			group: 'info',
			memberName: 'userinfo',
			description: 'Displays Information about the user'
		});
	}

	run = async (message) => {
		const logo = 'https://cdn.discordapp.com/avatars/433645584696475653/a_72cbe8a7de63f0458496e2b71a947d5e.gif';

		const { guild, channel } = message;

		const user = message.mentions.users.first() || message.member.user;
		const member = guild.members.cache.get(user.id);

		const embed = new MessageEmbed()
			.setAuthor(`User Info for ${user.username}`, user.displayAvatarURL())
			.setFooter(`User Info requested by ${message.author.tag}`, logo)
			.setColor('#f42069')
			.addFields(
				{
					name: 'User Tag',
					value: user.tag
				},
				{
					name: 'Is Bot',
					value: user.bot
				},
				{
					name: 'Nickname',
					value: member.nickname || 'None'
				},
				{
					name: 'Joined Server',
					value: new Date(member.joinedTimestamp).toLocaleDateString()
				},
				{
					name: 'Joined Discord',
					value: new Date(user.createdTimestamp).toLocaleDateString()
				},
				{
					name: 'Role Count',
					value: member.roles.cache.size - 1
				}
			);

		message.channel.send({ embed: embed });

		var now2 = new Date();
		console.log(`${dateformat(now2, "yyyy-mm-dd' 'HH:MM:ss")} UTC > ${message.author.id} > ${message.content}`);
	};
};
