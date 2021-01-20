const banSchema = require('@schemas/ban-schema');
const { MessageEmbed } = require('discord.js');
const { botlogname } = require('@root/config');
const dateformat = require('dateformat');

module.exports = (client) => {
	const checkBans = async () => {
		console.log('\033[0;36mCHECKING BAN DATA \033[0m');

		const current = new Date();

		const conditional = {
			expires: {
				$lt: current
			},
			current: true
		};

		const results = await banSchema.find(conditional);

		if (results && results.length) {
			for (const result of results) {
				const { guildId, userId } = result;

				const guild = client.guilds.cache.get(guildId);
				const member = (await guild.members.fetch()).get(userId);

				guild.members.unban(userId, [ 'Ban ausgelaufen' ]);

				let ReportChannel = guild.channels.cache.find((ch) => ch.name === botlogname);
				let embed = new MessageEmbed()
					.setColor('#00ff00')
					.setAuthor(`${client.user.tag} (ID ${client.user.id})`, client.user.displayAvatarURL())
					.setDescription(`🤝**Unbanned <@${userId}>** (ID ${userId})\n📄**Grund:** Ban ausgelaufen`);
				ReportChannel.send({ embed: embed });

				var now = new Date();
				console.log(`${dateformat(now, "yyyy-mm-dd' 'HH:MM:ss")} UTC > ${userId} > Ban Expired`);
			}

			await banSchema.updateMany(conditional, {
				current: false
			});
		}
		setTimeout(checkBans, 1000 * 60 * 100);
	};
	checkBans();
};
