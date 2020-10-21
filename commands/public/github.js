module.exports = {
	commands: 'github',
	minArgs: 0,
	maxArgs: 0,
	description: 'Replies with the github link to this project',
	callback: (message, arguments, text) => {
		var linkemoji = '🔗';
		message.channel.send(
			`${linkemoji} https://github.com/PhilRoli/DB_RoliTheBot/blob/master/bot_js.js ${linkemoji}`
		);
	}
};
