require('module-alias/register');

const path = require('path');
const Commando = require('discord.js-commando');
const { MongoClient } = require('mongodb');
const MongoDBProvider = require('commando-provider-mongo');
var time = new Date();

const mongo = require('@util/mongo');
const config = require('@root/config.json');
const loadFeatures = require('@root/features/load-features');

// utils / features
const memberCount = require('@features/member-count');

const client = new Commando.CommandoClient({
	owner: '433645584696475653',
	commandPrefix: config.prefix
});

client.setProvider(
	MongoClient.connect(config.mongoPath)
		.then((client) => {
			return new MongoDBProvider(client, 'bot-db');
		})
		.catch((err) => {
			console.error(err);
		})
);

client.on('ready', async () => {
	console.log(`Logged in as ${client.user.tag}!`);
	console.log('Start at ' + time.getMinutes() + ':' + time.getSeconds());
	console.log(' ');

	await mongo();

	client.registry
		.registerGroups([
			[ 'misc', 'Misc' ],
			[ 'moderation', 'Moderation' ],
			[ 'info', 'Informations' ],
			[ 'unlisted', 'Unlisted' ],
			[ 'testing', 'Testing' ]
		])
		.registerDefaultGroups()
		.registerDefaultTypes({ string: true })
		.registerDefaultCommands({ ping: false, eval: false, commandState: false })
		.registerCommandsIn(path.join(__dirname, 'cmds'));

	client.user.setActivity('!help for commands');

	loadFeatures(client);
});

client.login(config.token);
