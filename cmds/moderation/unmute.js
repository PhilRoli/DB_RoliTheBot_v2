const Commando = require('discord.js-commando');
const muteSchema = require('@schemas/mute-schema');
const { MessageEmbed } = require('discord.js');
const { botlogname } = require('@root/config');
const dateformat = require('dateformat');

module.exports = class UnMuteCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'unmute',
			group: 'moderation',
			memberName: 'unmute',
			description: 'Unmutes muted Users',
			userPermissions: [ 'ADMINISTRATOR' ],
			argsType: 'multiple'
		});
	}

	run = async (message, args) => {
		const { guild } = message;

		if (args.length < 1) {
			message.channel.send(
				`Please use the corecct syntax: ${guild.commandPrefix}mute <Target @ or ID> <optional: reason>`
			);
			return;
		}

		let id = '';

		const target = message.mentions.users.first();

		if (target) {
			id = target.id;
		} else {
			id = args[0];
		}

		const result = await muteSchema.updateOne(
			{
				guildId: guild.id,
				userId: id,
				current: true
			},
			{
				current: false
			}
		);

		args.shift();

		if (result.nModified === 1) {
			const mutedRole = guild.roles.cache.find((role) => {
				return role.name === 'Muted';
			});

			if (mutedRole) {
				const guildMember = guild.members.cache.get(id);
				guildMember.roles.remove(mutedRole);
			}

			message.channel.send(`You unmuted <@${id}>`);

			let ReportChannel = message.guild.channels.cache.find((ch) => ch.name === botlogname);
			let embed = new MessageEmbed()
				.setColor('#00ff00')
				.setAuthor(`${message.author.tag} (ID ${message.author.id})`, message.author.displayAvatarURL())
				.setDescription(`🔊**Unmuted <@${id}>** (ID ${id})\n📄**Reason:** ${args.join(' ') || 'Manual Unmute'}`)
				.setThumbnail(target.displayAvatarURL());
			ReportChannel.send({ embed: embed });
			target.send({ embed: embed });

			var now = new Date();
			console.log(`${dateformat(now, "yyyy-mm-dd' 'HH:MM:ss")} UTC > ${message.author.id} > ${message.content}`);
		} else {
			message.channel.send('That user is not muted');
		}
	};
};
