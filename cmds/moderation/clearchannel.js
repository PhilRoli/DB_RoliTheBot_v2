const Commando = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const { botlogname } = require('@root/config');
const dateformat = require('dateformat');

module.exports = class ClearChannelCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'clearchannel',
			group: 'moderation',
			aliases: [ 'cc', 'clearchannel' ],
			memberName: 'clearchannel',
			description: 'deletes all messages under 14 days old',
			clientPermissions: [ 'MANAGE_MESSAGES' ],
			userPermissions: [ 'MANAGE_MESSAGES' ]
		});
	}

	async run(message) {
		message.channel.messages.fetch().then((results) => {
			message.channel.bulkDelete(results);

			let ReportChannel = message.guild.channels.cache.find((ch) => ch.name === botlogname);
			let embed = new MessageEmbed()
				.setColor('#0000ff')
				.setAuthor(`${message.author.tag} (ID ${message.author.id})`, message.author.displayAvatarURL())
				.setDescription(
					`🗑️**Delete <#${message.channel.id}>** (ID ${message.channel.id})\n📄**Ammount:** 100`
				);
			ReportChannel.send({ embed: embed });

			var now = new Date();
			console.log(`${dateformat(now, "yyyy-mm-dd' 'HH:MM:ss")} UTC > ${message.author.id} > ${message.content}`);
		});
	}
};
