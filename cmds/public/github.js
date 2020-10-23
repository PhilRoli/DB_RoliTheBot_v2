const Commando = require('discord.js-commando');

var time = new Date();
greenOutput = '\033[32m';
resetOutput = '\u001B[0m';

module.exports = class GithubCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'github',
			group: 'public',
			memberName: 'github',
			description: 'Replies with the link to this projects Github repo'
		});
	}

	async run(message) {
		var linkemoji = '🔗';
		message.channel.send(
			`${linkemoji} https://github.com/PhilRoli/DB_RoliTheBot/blob/master/bot_js.js ${linkemoji}`
		);

		console.log(`${greenOutput}--${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}--${resetOutput}`);
		console.log(`${message.author.tag} used ${message.content}`);
	}
};
