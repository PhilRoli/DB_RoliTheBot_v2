const Commando = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const { botlogname } = require('@root/config');
const dateformat = require('dateformat');

module.exports = class KickComamnd extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'kick',
			group: 'moderation',
			memberName: 'kick',
			description: 'Kicks a member from the Server',
			clientPermissions: [ 'KICK_MEMBERS' ],
			userPermissions: [ 'KICK_MEMBERS' ],
			argsType: 'multiple'
		});
	}

	async run(message, args) {
		const target = message.mentions.users.first();
		if (!target) {
			message.channel.send('Please specify someone to kick');
			return;
		}

		args.shift().toLowerCase();

		const { guild } = message;

		const member = guild.members.cache.get(target.id);

		if (member.kickable) {
			member.kick();
			message.channel.send('The user has been kicked!');

			let ReportChannel = message.guild.channels.cache.find((ch) => ch.name === botlogname);
			let embed = new MessageEmbed()
				.setColor('#ff0000')
				.setAuthor(`${message.author.tag} (ID ${message.author.id})`, message.author.displayAvatarURL())
				.setDescription(
					`👢**Kicked <@${target.id}>** (ID ${target.id})\n📄**Reason:** ${args.join(' ') ||
						'(no reason specified)'}`
				)
				.setThumbnail(target.displayAvatarURL());
			ReportChannel.send({ embed: embed });

			var now = new Date();
			console.log(`${dateformat(now, "yyyy-mm-dd' 'HH:MM:ss")} UTC > ${message.author.id} > ${message.content}`);
		} else {
			message.channel.send('I cannot kick this user');
		}
	}
};
