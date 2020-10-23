const Commando = require('discord.js-commando');

var time = new Date();
greenOutput = '\033[32m';
resetOutput = '\u001B[0m';

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

		console.log(`${greenOutput}--${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}--${resetOutput}`);
		console.log(`${message.author.tag} used ${message.content}`);
	}
};
