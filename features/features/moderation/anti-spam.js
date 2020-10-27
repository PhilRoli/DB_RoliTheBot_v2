const muteSchema = require('@schemas/mute-schema');
const { UserManager } = require('discord.js');

module.exports = (client) => {
	const usersMap = new Map();
	const WARNLIMIT = 3;
	const MUTELIMIT = 7;
	const TIMEOUT = 5000;
	const DIFF = 2500;

	client.on('message', async (message) => {
		if (message.author.id !== '766273088836861962') {
			console.log(`ID: ${message.author.id}`);
			const { guild, author: staff } = message;

			if (usersMap.has(message.author.id)) {
				const userData = usersMap.get(message.author.id);
				const { lastMessage, timer } = userData;
				const difference = message.createdTimestamp - lastMessage.createdTimestamp;
				let msgCount = userData.msgCount;

				if (difference > DIFF) {
					clearTimeout(timer);
					userData.msgCount = 1;
					userData.lastMessage = message;
					userData.timer = setTimeout(() => {
						usersMap.delete(message.author.id);
					}, TIMEOUT);
					usersMap.set(message.author.id, userData);
				} else {
					++msgCount;
					if (parseInt(msgCount) === MUTELIMIT) {
						const target = message.member;
						const reason = 'Spamming';

						const previousMutes = await muteSchema.find({
							userId: target.id
						});

						let duration = 1 * (previousMutes.length + 1);

						const expires = new Date();
						expires.setHours(expires.getHours() + duration);

						const mutedRole = guild.roles.cache.find((role) => {
							return role.name === 'Muted';
						});

						await new muteSchema({
							userId: target.id,
							guildId: guild.id,
							reason,
							staffId: 770021183525486622,
							staffTag: 'ESSL_1#0929',
							expires,
							current: true
						}).save();

						message.member.roles.add(mutedRole);

						message.channel.send(
							`<@${target.id}> has been muted for ${duration} hours because of spamming`
						);
						// } else if (parseInt(msgCount) === WARNLIMIT) {
						// 	message.channel.send(`<@${message.author.id}> please stop spamming or you will be muted`);
					} else {
						userData.msgCount = msgCount;
						usersMap.set(message.author.id, userData);
					}
				}
			} else {
				let fn = setTimeout(() => {
					usersMap.delete(message.author.id);
				}, TIMEOUT);
				usersMap.set(message.author.id, {
					msgCount: 1,
					lastMessage: message,
					timer: fn
				});
			}
		}
	});
};
