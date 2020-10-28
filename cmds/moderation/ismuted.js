const Commando = require('discord.js-commando');
const muteSchema = require('@schemas/mute-schema');
const { MessageEmbed } = require('discord.js');
const dateformat = require('dateformat');

module.exports = class ismutedCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'ismuted',
			group: 'moderation',
			memberName: 'ismuted',
			description: 'Returns if a user is muted, if so display additional information',
			userPermissions: [ 'ADMINISTRATOR' ],
			argsType: 'multiple'
		});
	}

	run = async (message, args) => {
		//ismuted <ID>

		const { guild } = message;

		if (args.length !== 1) {
			message.channel.send(`Correct syntax: ${guild.commandPrefix}ismuted <User ID>`);
			return;
		}

		const id = args[0];

		if (id.charAt(0) === '<') {
			message.channel.send(`Correct syntax: ${guild.commandPrefix}ismuted <User ID>`);
			return;
		}

		const members = await guild.members.fetch();
		const target = members.get(id);
		const isInDiscord = !!target;

		const currentMute = await muteSchema.findOne({
			userId: id,
			guildId: guild.id,
			current: true
		});

		const embed = new MessageEmbed()
			.setAuthor(`Mute info for ${target ? target.user.tag : id}`, target ? target.user.displayAvatarURL() : '')
			.addField('Currently muted', currentMute ? 'Yes' : 'No')
			.addField('Is in Discord', isInDiscord ? 'Yes' : 'No');

		if (currentMute) {
			const date = new Date(currentMute.expires);
			embed
				.addField('Muted by', `<@${currentMute.staffId}>`)
				.addField('Muted for', currentMute.reason.toLowerCase())
				.addField('Mute expires', `${date.toLocaleString()} EST`);
		}

		message.channel.send(embed);

		var now2 = new Date();
		console.log(`${dateformat(now2, "yyyy-mm-dd' 'HH:MM:ss")} UTC > ${message.author.id} > ${message.content}`);
	};
};
