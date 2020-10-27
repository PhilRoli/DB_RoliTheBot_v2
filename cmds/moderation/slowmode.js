const Commando = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const { botlogname } = require('@root/config');
const dateformat = require('dateformat');

module.exports = class slowmodeCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'slowmode',
			group: 'moderation',
			aliases: [ 'slow' ],
			memberName: 'slowmode',
			description: 'Puts a channel into slowmode',
			userPermissions: [ 'ADMINISTRATOR' ],
			argsType: 'multiple'
		});
	}

	run = async (message, args) => {
		const { guild, channel } = message;

		if (args.length < 1) {
			message.channel.send(`Correct Syntax: ${guild.commandPrefix}slow <seconds / off> <optional: reason>`);
			return;
		}

		let duration = args.shift().toLowerCase();

		if (duration === 'off') {
			duration = 0;
		}

		if (isNaN(duration)) {
			message.channel.send(`Correct Syntax: ${guild.commandPrefix}slow <seconds / off> <optional: reason>`);
			return;
		}

		channel.setRateLimitPerUser(duration, args.join(' '));

		let ReportChannel = message.guild.channels.cache.find((ch) => ch.name === botlogname);
		let embed = new MessageEmbed()
			.setColor('#0000ff')
			.setAuthor(`${message.author.tag} (ID ${message.author.id})`, message.author.displayAvatarURL())
			.setDescription(
				`🐌**Slowmode <#${message.channel.id}>** (ID ${message.channel
					.id})\n⏱️**Ammount:** ${duration}\n📄**Reason:** ${args.join(' ')}`
			);
		ReportChannel.send({ embed: embed });

		var now = new Date();
		console.log(`${dateformat(now, "yyyy-mm-dd' 'HH:MM:ss")} UTC > ${message.author.id} > ${message.content}`);
	};
};
