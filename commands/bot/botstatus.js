module.exports = {
	commands: 'status',
	expectedArgs: '<status>',
	permissionError: 'You need Admin permission to execute this Command',
	minArgs: 1,
	callback: (message, arguments, text) => {
		client.user.setPresence({
			activity: {
				name: text,
				type: 0
			}
		});
	},
	permissions: ['ADMINISTRATOR'],
};
