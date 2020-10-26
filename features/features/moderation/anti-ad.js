const { botlog } = require('@root/config');

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

		const code = content.split('discord.gg/')[1];
		const logChannel = await client.channels.cache.get(botlog);

		if (content.includes('discord.gg/')) {
			const isOurInvite = await isInvite(guild, code);
			if (!isOurInvite) {
				logChannel.send(`${message.author.tag} sent a Discord link to ${message.channel}`);
				message.reply(
					'Please dont advertise or you will get muted.\nIf you think the server should have acces to your link, message a staff member'
				);
				message.delete();
			}
		}
	});
};
