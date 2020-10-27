const { MessageEmbed } = require('discord.js');
const { botlogname } = require('@root/config');
const muteSchema = require('@schemas/mute-schema');
const dateformat = require('dateformat');

let authors = [];
let warned = [];
let punishedList = [];
let messageLog = [];

module.exports = async (client) => {
	/* Declaring our options which we are going to work on */

	const limitUntilWarn = 3;
	const limitUntilMuted = 7;
	const interval = 5000;
	const warningMessage = "if you don't stop from spamming, you will get muted!";
	const muteMessage = 'has been muted!';
	const maxDuplicatesWarning = 7;
	const maxDuplicatesMute = 10;
	const ignoredRoles = [ 'Just some Bot' ];
	const ignoredMembers = [];
	const logChannel = botlogname;

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
		const MuteMember = async (m) => {
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

				let embed = new MessageEmbed()
					.setColor('#ff0000')
					.setAuthor(`${client.user.tag} (ID ${client.user.id})`, client.user.displayAvatarURL())
					.setDescription(
						`🔇**Muted ${target.tag}** (ID ${target.id})\n📄**Reason:** Spamming in ${message.channel}`
					);
				ReportChannel.send({ embed: embed });

				var now = new Date();
				console.log(`${dateformat(now, "yyyy-mm-dd' 'HH:MM:ss")} UTC > ${target.id} > Muted for spamming`);
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
