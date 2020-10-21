const Discord = require('discord.js');
const client = new Discord.Client();
var time = new Date();

const config = require('./config.json');
const loadCommands = require('./commands/load-commands');
// const mongo = require('./mongo.js');

// commands
const memberCount = require('./autorun/member-count');
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
});

client.login(config.token);
