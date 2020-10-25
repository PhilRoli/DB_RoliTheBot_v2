const firstMessage = require('@util/first-message');
const { rolechannel } = require('@root/config');

module.exports = (client) => {
	const channelId = rolechannel;

	const getEmoji = (emojiName) => client.emojis.cache.find((emoji) => emoji.name === emojiName);

	const emojis = {
		// emoji: role
		racoons: 'Racoons',
		csgo: 'CSGO',
		hoi4: 'Hearts of Iron 4',
		arma3: 'Arma 3',
		forza7: 'Forza 7',
		checkmark: 'Soldat'
	};

	const reactions = [];

	let emojiText =
		'\n**Reagiert mit dem Emoji um die Rolle zu bekommen.**\nUm den Rest des Servers zu sehen, reagiert mit dem ✔️\n';
	for (const key in emojis) {
		const emoji = getEmoji(key);
		reactions.push(emoji);

		const role = emojis[key];
		if (role === 'Soldat') {
			emojiText += `${emoji} = Verifiziert\n\n`;
		} else {
			emojiText += `${emoji} = ${role}\n`;
		}
	}

	firstMessage(client, channelId, emojiText, reactions);

	const handleReaction = (reaction, user, add) => {
		if (user.id === '766273088836861962') {
			return;
		}

		const emoji = reaction._emoji.name;

		const { guild } = reaction.message;

		const roleName = emojis[emoji];
		if (!roleName) {
			return;
		}

		const role = guild.roles.cache.find((role) => role.name === roleName);
		const member = guild.members.cache.find((member) => member.id === user.id);

		if (add) {
			member.roles.add(role);
		} else {
			member.roles.remove(role);
		}
	};

	client.on('messageReactionAdd', (reaction, user) => {
		if (reaction.message.channel.id === channelId) {
			handleReaction(reaction, user, true);
		}
	});

	client.on('messageReactionRemove', (reaction, user) => {
		if (reaction.message.channel.id === channelId) {
			handleReaction(reaction, user, false);
		}
	});
};
