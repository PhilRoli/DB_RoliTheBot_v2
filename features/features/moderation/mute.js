const muteSchema = require('@schemas/mute-schema');
const { MessageEmbed } = require('discord.js');
const { botlogname } = require('@root/config');
const dateformat = require('dateformat');

module.exports = (client) => {
	const checkMutes = async () => {
		console.log('\033[0;36mCHECKING MUTE DATA \033[0m');

		const current = new Date();

		const conditional = {
			expires: {
				$lt: current
			},
			current: true
		};

		const results = await muteSchema.find(conditional);

		if (results && results.length) {
			for (const result of results) {
				const { guildId, userId } = result;

				const guild = client.guilds.cache.get(guildId);
				const member = (await guild.members.fetch()).get(userId);

				const mutedRole = guild.roles.cache.find((role) => {
					return role.name === 'Muted';
				});

				member.roles.remove(mutedRole);

				let ReportChannel = guild.channels.cache.find((ch) => ch.name === botlogname);
				let embed = new MessageEmbed()
					.setColor('#00ff00')
					.setAuthor(`${client.user.tag} (ID ${client.user.id})`, client.user.displayAvatarURL())
					.setDescription(`🔊**Unmuted <@${member.id}>** (ID ${member.id})\n📄**Reason:** Mute Expired`)
					.setThumbnail(member.user.displayAvatarURL());
				ReportChannel.send({ embed: embed });

				var now = new Date();
				console.log(`${dateformat(now, "yyyy-mm-dd' 'HH:MM:ss")} UTC > ${member.id} > Mute Expired`);
			}

			await muteSchema.updateMany(conditional, {
				current: false
			});
		}

		setTimeout(checkMutes, 1000 * 60 * 10);
	};
	checkMutes();

	client.on('guildMemberAdd', async (member) => {
		const { guild, id } = member;

		const currentMute = await muteSchema.findOne({
			userId: id,
			guildId: guild.id,
			current: true
		});

		if (currentMute) {
			const role = guild.roles.cache.find((role) => {
				return role.name === 'Muted';
			});

			if (role) {
				member.roles.add(role);

				let ReportChannel = guild.channels.cache.find((ch) => ch.name === botlogname);
				let embed = new MessageEmbed()
					.setColor('#ff0000')
					.setAuthor(`${client.user.tag} (ID ${client.user.id})`, client.user.displayAvatarURL())
					.setDescription(
						`🔇**Muted <@${member.id}>** (ID ${member.id})\n📄**Reason:** Rejoined while still muted`
					)
					.setThumbnail(member.user.displayAvatarURL());
				ReportChannel.send({ embed: embed });

				var now2 = new Date();
				console.log(
					`${dateformat(now2, "yyyy-mm-dd' 'HH:MM:ss")} UTC > ${member.id} > Rejoined while still muted`
				);
			}
		}
	});
};
