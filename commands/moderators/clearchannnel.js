module.exports = {
	commands: [ 'cc', 'clearchannel' ],
	permissionError: 'You need Admin permission to execute this command',
	minArgs: 0,
	maxArgs: 0,
	description: 'Clears the entire text channel',
	callback: (message, arguments, text) => {
		message.channel.messages.fetch().then((results) => {
			message.channel.bulkDelete(results);
		});
	},
	permissions: [ 'ADMINISTRATOR' ]
};
