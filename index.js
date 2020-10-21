const Discord = require('discord.js');
const path = require('path');
const fs = require('fs');
const client = new Discord.Client();
var time = new Date();

const config = require('./config.json');
const mongo = require('./mongo.js');

// commands
const memberCount = require('./autorun/member-count');
const { Mongoose } = require('mongoose');
const { Cipher } = require('crypto');
const { cli } = require('winston/lib/winston/config');

client.on('ready', async () => {
	console.log(`Logged in as ${client.user.tag}!`);
	console.log('Start at ' + time.getMinutes() + ':' + time.getSeconds());
	console.log(' ');
	client.user.setActivity('!commands for help');
	memberCount(client);

	await mongo().then((mongoose) => {
		try {
			console.log('connected to mongo!');
		} finally {
			mongoose.connection.close();
		}
	});

	const baseFile = 'command-base.js';
	const commandBase = require(`./commands/${baseFile}`);

	const readCommands = (dir) => {
		const files = fs.readdirSync(path.join(__dirname, dir));
		for (const file of files) {
			const stat = fs.lstatSync(path.join(__dirname, dir, file));
			if (stat.isDirectory()) {
				readCommands(path.join(dir, file));
			} else if (file !== baseFile) {
				const option = require(path.join(__dirname, dir, file));
				commandBase(client, option);
			}
		}
	};

	readCommands('commands');
});

client.login(config.token);
