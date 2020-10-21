require('module-alias/register');

const Discord = require('discord.js');
const client = new Discord.Client();
var time = new Date();

const config = require('@root/config.json');
const loadCommands = require('@root/commands/load-commands');
const loadFeatures = require('@root/features/load-features');
// const mongo = require('@util/mongo.js');

// utils / features
const memberCount = require('@features/member-count');
// const { Mongoose } = require('mongoose');

client.on('ready', async () => {
	console.log(`Logged in as ${client.user.tag}!`);
	console.log('Start at ' + time.getMinutes() + ':' + time.getSeconds());
	console.log(' ');
	client.user.setActivity('Work in Progress');
	memberCount(client);

	// await mongo().then((mongoose) => {
	// 	try {
	// 		console.log('connected to mongo!');
	// 	} finally {
	// 		mongoose.connection.close();
	// 	}
	// });

	loadCommands(client);
	loadFeatures(client);
});

client.login(config.token);
