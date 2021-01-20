const Commando = require('discord.js-commando');
const banSchema = require('@schemas/ban-schema');
const { MessageEmbed } = require('discord.js');
const { botlogname } = require('@root/config');
const dateformat = require('dateformat');

module.exports = class BanCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'ban',
			group: 'moderation',
			memberName: 'ban',
			description: 'Bant den angegeben User',
			userPermissions: [ 'BAN_MEMBERS' ],
			argsType: 'multiple'
		});
	}

	run = async (message, args) => {
		// guildMember.ban({ days: 7, reason: 'They deserved it' })
		// guild.members.ban(id, {days: 0, reason: reason})
		const { guild, author: staff } = message;
		let duration = 0;

		if (args.length < 3) {
			message.channel.send(`Richtiger syntax: ${guild.commandPrefix}ban <User @ / id> <Zeit [t]> <Grund>`);
			return;
		}

		let id = '';
		const target = message.mentions.users.first();
		if (target) {
			id = target.id;
		} else {
			id = args[0];
		}

		let reason = args.slice(2).join(' ');
		duration = args[1] * 24;

		const expires = new Date();
		expires.setHours(expires.getHours() + duration);

		await new banSchema({
			userId: id,
			guildId: guild.id,
			reason: reason,
			staffId: staff.id,
			staffTag: staff.tag,
			expires,
			current: true
		}).save();

		const targetU = this.client.users.cache.find((user) => user.id === id);
		let ReportChannel = message.guild.channels.cache.find((ch) => ch.name === botlogname);
		let embed = new MessageEmbed()
			.setColor('#ff0000')
			.setAuthor(`${staff.tag} (ID ${staff.id})`, staff.displayAvatarURL())
			.setDescription(`🔨**Banned <@${id}>** (ID ${id})\n📄**Grund:** ${reason}\n⏱️**Länge:** ${duration / 24}t`)
			.setThumbnail(targetU.displayAvatarURL());
		ReportChannel.send({ embed: embed });
		targetU.send({ embed: embed });

		var now = new Date();
		console.log(`${dateformat(now, "yyyy-mm-dd' 'HH:MM:ss")} UTC > ${message.author.id} > ${message.content}`);

		guild.members.ban(id, { days: 0, reason: reason });
	};
};
