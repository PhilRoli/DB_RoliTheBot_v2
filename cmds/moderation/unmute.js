const Commando = require('discord.js-commando');
const muteSchema = require('@schemas/mute-schema');

var time = new Date();
yellowOutput = '\033[33m';
resetOutput = '\u001B[0m';

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

		if (args.length !== 1) {
			message.channel.send(`Please use the corecct syntax: ${guild.commandPrefix}mute <Target @ or ID>`);
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

		if (result.nModified === 1) {
			const mutedRole = guild.roles.cache.find((role) => {
				return role.name === 'Muted';
			});

			if (mutedRole) {
				const guildMember = guild.members.cache.get(id);
				guildMember.roles.remove(mutedRole);
			}

			message.channel.send(`You unmuted <@${id}>`);

			console.log(
				`${yellowOutput}--${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}--${resetOutput}`
			);
			console.log(`${message.author.tag} used ${message.content}`);
		} else {
			message.channel.send('That user is not muted');
		}
	};
};
