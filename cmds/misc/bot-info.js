const Commando = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const { version } = require('@root/package.json');

var time = new Date();
greenOutput = '\033[32m';
resetOutput = '\u001B[0m';

module.exports = class BotInfoCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'botinfo',
			group: 'misc',
			memberName: 'botinfo',
			description: 'Displays Information about the Bot'
		});
	}

	run = async (message) => {
		const logo = 'https://cdn.discordapp.com/avatars/433645584696475653/a_72cbe8a7de63f0458496e2b71a947d5e.gif';
		let totalMembers = 0;

		for (const guild of this.client.guilds.cache) {
			totalMembers += (await guild[1].members.fetch()).size;
		}

		console.log('Member count');
		const embed = new MessageEmbed()
			.setAuthor(`Information about the "${this.client.user.username}" Bot`, this.client.user.displayAvatarURL())
			.setFooter(`Bot Info requested by ${message.author.tag}`, logo)
			.setColor('#f42069')
			.setDescription('Test')
			.addFields(
				{
					name: 'Bot Tag',
					value: this.client.user.tag
				},
				{
					name: 'Version',
					value: version
				},
				{
					name: "Server's Command Prefix",
					value: message.guild.commandPrefix
				},
				{
					name: 'Time since last restart',
					value: `${process.uptime().toFixed(2)}s`
				},
				{
					name: 'Server Count',
					value: this.client.guilds.cache.size
				},
				{
					name: 'Total Members',
					value: totalMembers
				}
			);

		message.channel.send({ embed: embed });

		console.log(`${greenOutput}--${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}--${resetOutput}`);
		console.log(`${message.author.tag} used ${message.content}`);
	};
};
