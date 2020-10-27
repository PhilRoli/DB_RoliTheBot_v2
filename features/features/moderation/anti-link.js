const { MessageEmbed } = require('discord.js');
const { botlogname } = require('@root/config');
const dateformat = require('dateformat');

module.exports = (client) => {
	const isInvite = async (guild, code) => {
		return await new Promise((resolve) => {
			guild.fetchInvites().then((invites) => {
				for (const invite of invites) {
					if (code === invite[0]) {
						resolve(true);
						return;
					}
				}
				resolve(false);
			});
		});
	};

	client.on('message', async (message) => {
		const { guild, member, content } = message;

		if (message.member.hasPermission('ADMINISTRATOR')) {
			return;
		}

		const code = content.split('discord.gg/')[1];

		//  || content.includes('https://')
		if (content.includes('discord.gg/')) {
			const isOurInvite = await isInvite(guild, code);
			if (!isOurInvite) {
				let ReportChannel = message.guild.channels.cache.find((ch) => ch.name === botlogname);
				let embed = new MessageEmbed()
					.setColor('#ffed00')
					.setAuthor(`${client.user.tag} (ID ${client.user.id})`, client.user.displayAvatarURL())
					.setDescription(
						`🔗**Sent link <@${message.author.id}>** (ID ${message.author.id})\n📄**Link:** ${content}`
					)
					.setThumbnail(message.author.displayAvatarURL());
				ReportChannel.send({ embed: embed });

				var now = new Date();
				console.log(
					`${dateformat(now, "yyyy-mm-dd' 'HH:MM:ss")} UTC > ${message.author.id} > ${message.content}`
				);

				message.reply(
					'Please dont send links or you will get muted.\nIf you think the server should have acces to your link, message a staff member'
				);
				message.delete();
			}
		}
	});
};
