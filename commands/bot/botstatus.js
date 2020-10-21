module.exports = {
	commands: 'status',
	expectedArgs: '<status>',
	permissionError: 'You need Admin permission to execute this Command',
	minArgs: 1,
	description: 'WIP Sets the bots status',
	callback: (message, arguments, text) => {
		message.user.setPresence({
			activity: {
				name: text,
				type: 0
			}
		});
	},
	permissions: ['ADMINISTRATOR'],
};
