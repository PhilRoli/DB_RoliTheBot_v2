const Commando = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const { botlogname } = require('@root/config');
const dateformat = require('dateformat');

module.exports = class DeleteCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'delete',
			group: 'moderation',
			aliases: [ 'del' ],
			memberName: 'delete',
			description: 'Deletes the given ammount of messages',
			clientPermissions: [ 'MANAGE_MESSAGES' ],
			userPermissions: [ 'MANAGE_MESSAGES' ],
			argsType: 'multiple'
		});
	}

	async run(message, args) {
		if (args.length !== 1) {
			message.channel.send(`Correct syntax: ${message.guild.commandPrefix}delete <1 - 99>`);
			return;
		}

		let times = 0;
		times = parseInt(args[0]);

		if (Number.isInteger(times) === true && times > 0 && times < 100) {
			times += 1;
			message.channel.messages.fetch({ limit: times }).then((messages) => {
				message.channel.bulkDelete(messages);

				let ReportChannel = message.guild.channels.cache.find((ch) => ch.name === botlogname);
				let embed = new MessageEmbed()
					.setColor('#0000ff')
					.setAuthor(`${message.author.tag} (ID ${message.author.id})`, message.author.displayAvatarURL())
					.setDescription(
						`🗑️**Delete <#${message.channel.id}>** (ID ${message.channel.id})\n📄**Ammount:** ${times}`
					);
				ReportChannel.send({ embed: embed });

				var now = new Date();
				console.log(
					`${dateformat(now, "yyyy-mm-dd' 'HH:MM:ss")} UTC > ${message.author.id} > ${message.content}`
				);
			});
		} else {
			message.channel.send(`Wrong syntax. Please use: ${message.guild.commandPrefix}delete <1 - 99>`);
			return;
		}
	}
};
