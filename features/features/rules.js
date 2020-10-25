const firstMessage = require('@util/first-message');
const { rulechannel } = require('@root/config');

module.exports = (client) => {
	const channelId = rulechannel;

	const getEmoji = (emojiName) => client.emojis.cache.find((emoji) => emoji.name === emojiName);

	const emojis = {
		// emoji: role
		checkmark: 'Soldat'
	};

	const reactions = [];

	let emojiText =
		'⁣   \n**Willkommen**\n\n**Kurz die Regeln:**\n1. Stell keine scheiße an\n2. Hab zumindest etwas Hirn\n3. Beachte die Channel Topics so guts geht\n\n**Bot Vorzeichen:**\n!    <@Just some Bot#1972>\n,    <@Virtual Fisher#7036>\n+    <@Groovy#7254>\n-    <@YAGPDB.xyz#8760>\nowo  <@OwO#8456>\ns?   <@Statbot#3472>\n\nWenn du nicht sowie so schon ne Role hast, einaml unten mit :white_check_mark: reagieren, dann siehst zumindest nen teil mal.';
	for (const key in emojis) {
		const emoji = getEmoji(key);
		reactions.push(emoji);
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
