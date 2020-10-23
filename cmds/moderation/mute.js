const Commando = require('discord.js-commando');
const muteSchema = require('@schemas/mute-schema');

var time = new Date();
yellowOutput = '\033[33m';
resetOutput = '\u001B[0m';

const reasons = {
	SPAMMING: 1,
	ADVERTISING: 2
};

module.exports = class MuteCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'mute',
			group: 'moderation',
			memberName: 'mute',
			description: 'Mutes a User',
			userPermissions: [ 'ADMINISTRATOR' ],
			argsType: 'multiple'
		});
	}

	run = async (message, args) => {
		const { guild, author: staff } = message;

		if (args.length !== 2) {
			message.channel.send(`Correct syntax: ${guild.commandPrefix}mute <Target @> <Reason>`);
			return;
		}

		const target = message.mentions.users.first();
		if (!target) {
			message.channel.send('Please specify someone to mute');
			return;
		}

		const reason = args[1].toUpperCase();
		if (!reasons[reason]) {
			let validReasons = '';
			for (const key in reasons) {
				validReasons += `${key}, `;
			}
			validReasons = validReasons.substr(0, validReasons.length - 2);

			message.channel.send(`Unknown reason, please use one of the following: ${validReasons}`);
			return;
		}

		const previousMutes = await muteSchema.find({
			userId: target.id
		});

		const currentlyMuted = previousMutes.filter((mute) => {
			return mute.current === true;
		});

		if (currentlyMuted.length) {
			message.channel.send('That user is already muted');
			return;
		}

		let duration = reasons[reason] * (previousMutes.length + 1);

		const expires = new Date();
		expires.setHours(expires.getHours() + duration);

		const mutedRole = guild.roles.cache.find((role) => {
			return role.name === 'Muted';
		});
		if (!mutedRole) {
			message.channel.send('Could not find a "Muted" role');
			return;
		}

		const targetMember = (await guild.members.fetch()).get(target.id);
		targetMember.roles.add(mutedRole);

		await new muteSchema({
			userId: target.id,
			guildId: guild.id,
			reason,
			staffId: staff.id,
			staffTag: staff.tag,
			expires,
			current: true
		}).save();

		message.channel.send(`You muted <@${target.id}> for "${reason}". They will be unmuted in ${duration} hours.`);

		console.log(`${yellowOutput}--${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}--${resetOutput}`);
		console.log(`${message.author.tag} used ${message.content}`);
	};
};
