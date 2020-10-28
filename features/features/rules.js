const firstMessage = require('@util/first-message');
const { rulechannel, botid } = require('@root/config');

module.exports = (client) => {
	const channelId = rulechannel;

	const getEmoji = (emojiName) => client.emojis.cache.find((emoji) => emoji.name === emojiName);

	const emojis = {
		// emoji: role
		checkmark: 'Soldat'
	};

	const reactions = [];

	let emojiText =
		'⁣   \n**Willkommen**\n\n**Kurz die Regeln:**\n> 1. Stell keine scheiße an\n> 2. Hab zumindest etwas Hirn\n> 3. Beachte die Channel Topics so guts geht\n\n**Bot Vorzeichen:**\n> !         <@766273088836861962>\n> ,         <@574652751745777665>\n> +        <@234395307759108106>\n> -        <@204255221017214977>\n> owo  <@408785106942164992>\n> s?      <@491769129318088714>\n\nWenn du nicht sowie so schon ne Role hast, einaml unten mit :white_check_mark: reagieren, dann siehst zumindest nen teil mal.';
	for (const key in emojis) {
		const emoji = getEmoji(key);
		reactions.push(emoji);
	}

	firstMessage(client, channelId, emojiText, reactions);

	const handleReaction = (reaction, user, add) => {
		if (user.id === botid) {
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
