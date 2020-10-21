const loadCommands = require('./load-commands');
const { prefix } = require('../config.json');

module.exports = {
	commands: [ 'help', 'h' ],
	description: 'Describes all of the bot´s commands',
	callback: (message, arguments, text) => {
		let reply = 'I`am Roli the Bot, and here are my commands:\n\n';

		const commands = loadCommands();

		for (const command of commands) {
			// check for permission
			let permissions = command.permissions;

			if (permissions) {
				let hasPermission = true;
				if (typeof permissions === 'string') {
					permissions = [ permissions ];
				}

				for (const permission of permissions) {
					if (!message.member.hasPermission(permission)) {
						hasPermission = false;
						break;
					}
				}

				if (!hasPermission) {
					continue;
				}
			}

			// format text
			const mainCommand = typeof command.commands === 'string' ? command.commands : command.commands[0];
			const args = command.expectedArgs ? ` ${command.expectedArgs}` : '';
			const { description } = command;

			reply += `**${prefix}${mainCommand}${args}** = ${description}\n`;
        }
        message.channel.send(reply);
	},
};
