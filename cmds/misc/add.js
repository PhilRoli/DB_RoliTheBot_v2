const Commando = require('discord.js-commando');
const dateformat = require('dateformat');

module.exports = class AddCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'add',
			group: 'misc',
			memberName: 'misc',
			description: 'Adds numbers together',
			argsType: 'multiple'
		});
	}

	async run(message, args) {
		let sum = 0;

		for (const arg of args) {
			sum += parseInt(arg);
		}

		message.channel.send(`The sum is ${sum}`);

		var now2 = new Date();
		console.log(`${dateformat(now2, "yyyy-mm-dd' 'HH:MM:ss")} UTC > ${message.author.id} > ${message.content}`);
	}
};
