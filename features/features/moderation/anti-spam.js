const { MessageEmbed } = require('discord.js'); // Requiring this since we need it for embeds later
const { botlogname } = require('@root/config');
const muteSchema = require('@schemas/mute-schema');

let authors = [];
let warned = [];
let punishedList = [];
let messageLog = [];

module.exports = async (client) => {
	/* Declaring our options which we are going to work on */

	const limitUntilWarn = 3; // Default value: 3. Explication: This is the limit where you get the warn message. If the member X sent over 3 messages within the interval, he get warned
	const limitUntilMuted = 7; // Default value: 5. Explication: This is the limit where you get Punished. If the member X sent over 5 messages within the interval, he get muted.
	const interval = 5000; //Default Time: 2000MS (1000 milliseconds = 1 second, 2000 milliseconds = 2 seconds etc...). Explication: The interval where the messages are sent. Practically if member X sent 5+ messages within 2 seconds, he get muted
	const warningMessage = "if you don't stop from spamming, you will get muted!"; // Default Message: if you don't stop from spamming, I'm going to punish you!. Explication: None, it's just a message you get for the warning phase.
	const muteMessage = 'has been muted!'; // Default Message: "was muted since we don't like too much advertisement type people!". Explication: The message sent after member X was punished
	const maxDuplicatesWarning = 7; // Default value: 7. Explication: When people are spamming the same message, <limitUntilWarn> is ignored and this will trigger when member X sent over 7+ message that are the same.
	const maxDuplicatesMute = 10; // Deafult value: 10 Explication: The limit where member X get muted after sending too many messages(10+).
	const ignoredRoles = [ 'Just some Bot' ]; // Default value: None. Explication: The members with this role(or roles) will be ignored if they have it. Suggest to not add this to any random guys.
	const ignoredMembers = []; // Default value: None. Explication: These members are directly affected and they do not require to have the role above. Good for undercover pranks.
	// const mutedRole = 'Muted'; // Default value: muted. Explication: Here you put the name of the role that should not let people write/speak or anything else in your server. If there is no role set, by default, the module will attempt to create the role for you & set it correctly for every channel in your server. It will be named "muted".
	// const timeMuted = (options && options.timeMuted) || 1000 * 600; // Default value: 10 minutes. Explication: This is how much time member X will be muted. if not set, default would be 10 min.
	const logChannel = botlogname; // Default value: "AhtiSpam-logs". Explication: This is the channel where every report about spamming goes to. If it's not set up, it will attempt to create the channel.

	// Custom 'checkMessage' event that handles messages
	client.on('message', async (message) => {

		//time variables
		let clock = new Date();
		let ss = String(clock.getSeconds()).padStart(2, '0');
		let min = String(clock.getMinutes()).padStart(2, '0');
		let hrs = String(clock.getHours()).padStart(1, '0');
		clock = hrs + ':' + min + ':' + ss;

		let TheDate = new Date();
		let zilelesaptamanii = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
		let weekday = zilelesaptamanii[TheDate.getDay()];
		let dd = String(TheDate.getDate()).padStart(2, '0');
		let mon = String(TheDate.getMonth() + 1);
		let year = String(TheDate.getFullYear()).padStart(4, '00');
		TheDate = weekday + ', ' + mon + '/' + dd + '/' + year;
		//end of time variables

		//verify if it's pm or AM
		let amORpm;
		if (hrs >= 0 && hrs <= 12) {
			amORpm = 'AM';
		} else {
			amORpm = 'PM';
		}


		// The Mute function.
		const MuteMember = async (m, muteMsg) => {
			for (var i = 0; i < messageLog.length; i++) {
				if (messageLog[i].author == m.author.id) {
					messageLog.splice(i);
				}
			}

			punishedList.push(m.author.id);

			let user = m.guild.members.cache.get(m.author.id);
			let ReportChannel = m.guild.channels.cache.find((ch) => ch.name === logChannel);

			if (user) {
				const { guild } = message;

				const target = message.member;
				const reason = 'Spamming';

				const previousMutes = await muteSchema.find({
					userId: target.id
				});

				let duration = 1 * (previousMutes.length + 1);

				const expires = new Date();
				expires.setHours(expires.getHours() + duration);

				const mutedRole = guild.roles.cache.find((role) => {
					return role.name === 'Muted';
				});

				await new muteSchema({
					userId: target.id,
					guildId: guild.id,
					reason,
					staffId: client.user.id,
					staffTag: client.user.tag,
					expires,
					current: true
				}).save();

				message.member.roles.add(mutedRole);

				message.channel.send(`<@${target.id}> has been muted for ${duration} hours because of spamming`);
			} //end of user
		};

		// The warning function.
		const WarnMember = async (m, reply) => {
			warned.push(m.author.id);
			m.channel.send(`<@${m.author.id}>, ${reply}`);
		};

		if (message.author.bot) return;
		if (message.channel.type !== 'text' || !message.member || !message.guild || !message.channel.guild) return;

		if (
			message.member.roles.cache.some((r) => ignoredRoles.includes(r.name)) ||
			ignoredMembers.includes(message.author.tag)
		)
			return;

		if (message.author.id !== client.user.id) {
			let currentTime = Math.floor(Date.now());
			authors.push({
				time: currentTime,
				author: message.author.id
			});

			messageLog.push({
				message: message.content,
				author: message.author.id
			});

			let msgMatch = 0;
			for (var i = 0; i < messageLog.length; i++) {
				if (
					messageLog[i].message == message.content &&
					messageLog[i].author == message.author.id &&
					message.author.id !== client.user.id
				) {
					msgMatch++;
				}
			}

			if (msgMatch == maxDuplicatesWarning && !warned.includes(message.author.id)) {
				WarnMember(message, warningMessage);
			}

			if (msgMatch == maxDuplicatesMute && !punishedList.includes(message.author.id)) {
				MuteMember(message, muteMessage);
			}

			var matched = 0;

			for (var i = 0; i < authors.length; i++) {
				if (authors[i].time > currentTime - interval) {
					matched++;
					if (matched == limitUntilWarn && !warned.includes(message.author.id)) {
						WarnMember(message, warningMessage);
					} else if (matched == limitUntilMuted) {
						if (!punishedList.includes(message.author.id)) {
							MuteMember(message, muteMessage);
						}
					}
				} else if (authors[i].time < currentTime - interval) {
					authors.splice(i);
					warned.splice(warned.indexOf(authors[i]));
					punishedList.splice(warned.indexOf(authors[i]));
				}

				if (messageLog.length >= 200) {
					messageLog.shift();
				}
			}
		}
	});
};
