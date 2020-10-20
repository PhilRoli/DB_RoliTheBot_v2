const Discord = require('discord.js');
const client = new Discord.Client();
var time = new Date();

const config = require('./config.json');
const command = require('./commands');

// commands
const memberCount = require('./member-count');

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	console.log('Start at ' + time.getMinutes() + ':' + time.getSeconds());
	console.log(' ');
	client.user.setActivity('!commands for help');
	memberCount(client);
});

client.login(config.token);
