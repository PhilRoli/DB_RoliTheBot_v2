require('module-alias/register');

const path = require('path');
const Commando = require('discord.js-commando');
var time = new Date();

const config = require('@root/config.json');
const loadFeatures = require('@root/features/load-features');
// const mongo = require('@util/mongo.js');

// utils / features
const memberCount = require('@features/member-count');
// const { Mongoose } = require('mongoose');

const client = new Commando.CommandoClient({
	owner: '433645584696475653',
	commandPrefix: config.prefix
});

client.on('ready', async () => {
	console.log(`Logged in as ${client.user.tag}!`);
	console.log('Start at ' + time.getMinutes() + ':' + time.getSeconds());
	console.log(' ');

	client.registry
		.registerGroups([
			[ 'misc', 'Misc' ],
			[ 'moderation', 'Moderation' ],
			[ 'public', 'Public' ],
			[ 'unlisted', 'Unlisted' ]
		])
		.registerDefaultGroups()
		.registerDefaultTypes({ string: true })
		.registerDefaultCommands({ ping: false, prefix: false, eval: false, commandState: false })
		.registerCommandsIn(path.join(__dirname, 'cmds'));

	client.user.setActivity('!help for commands');

	// await mongo().then((mongoose) => {
	// 	try {
	// 		console.log('connected to mongo!');
	// 	} finally {
	// 		mongoose.connection.close();
	// 	}
	// });

	loadFeatures(client);
});

client.login(config.token);
