const Commando = require('discord.js-commando');
const dateformat = require('dateformat');

module.exports = class GithubCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'github',
			group: 'misc',
			memberName: 'github',
			description: 'Replies with the link to this projects Github repo'
		});
	}

	async run(message) {
		var linkemoji = '🔗';
		message.channel.send(
			`${linkemoji} https://github.com/PhilRoli/DB_RoliTheBot/blob/master/bot_js.js ${linkemoji}`
		);

		var now2 = new Date();
		console.log(`${dateformat(now2, "yyyy-mm-dd' 'HH:MM:ss")} UTC > ${message.author.id} > ${message.content}`);
	}
};
