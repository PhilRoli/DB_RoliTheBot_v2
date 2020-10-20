const addReactions = (message, reactions) => {
	message.react(reactions[0]);
	reactions.shift();
	if (reactions.lenght > 0) {
		setTimeout(() => addReactions(message, reactions), 750);
	}
};

module.exports = async (client, id, text, reactions = []) => {
	const channel = await client.channels.fetch(id);

	channel.messages.fetch().then((messages) => {
		if (messages.size === 0) {
			// Send new Message
			channel.send(text).then((message) => {
				addReactions(message, reactions);
			});
		} else {
			// Edit the existing Message
			for (const message of messages) {
				message[1].edit(text);
				addReactions(message[1], reactions);
			}
		}
	});
};
