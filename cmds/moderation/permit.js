const Commando = require('discord.js-commando');

module.exports = class PermitCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'permit',
			group: 'moderation',
			aliases: [ 'p' ],
			memberName: 'permit',
			description: 'Erlaubt einem User für 1 minute lang einen Link zu posten',
			argsType: 'multiple'
		});
	}

	run = async (message, args) => {
		const { guild } = message;

		if (args.lenght > 1) {
			message.channel.send(`Richtiger syntax: ${guild.commandPrefix}permit <User @ / ID>`);
			return;
		}

		let id = '';
		const target = message.mentions.users.first();
		if (target) {
			id = target.id;
		} else {
			id = args[0];
		}

		const permitRole = guild.roles.cache.find((role) => {
			return role.name === 'permit';
		});
		if (!permitRole) {
			message.channel.send('"permit" role konnte nicht gefunden werden. Bitte kontaktiere <@433645584696475653>');
			return;
		}

		const targetMember = (await guild.members.fetch()).get(id);
		targetMember.roles.add(permitRole);

		setTimeout(function() {
			targetMember.roles.remove(permitRole);
		}, 60000);
	};
};
