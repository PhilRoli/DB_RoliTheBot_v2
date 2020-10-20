const { prefix } = require('./config.json');
var time = new Date();

module.exports = (client, aliases, callback) => {
	if (typeof aliases === 'string') {
		aliases = [ aliases ];
	}

	client.on('message', (message) => {
		const { content } = message;

		aliases.forEach((aliases) => {
			const command = `${prefix}${aliases}`;

			if (content.startsWith(`${command} `) || content === command) {
				console.log(`--${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}--`);
				console.log(`${message.author.tag} ran ${command}`);
				callback(message);
			}
		});
	});
};
