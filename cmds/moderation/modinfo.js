const Commando = require('discord.js-commando');
const muteSchema = require('@schemas/mute-schema');
const banSchema = require('@schemas/ban-schema');
const { MessageEmbed } = require('discord.js');

module.exports = class ModinfoCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'modinfo',
			group: 'moderation',
			aliases: [ 'minfo' ],
			memberName: 'modinfo',
			description: 'Displays Info about a User like mutes & bans',
			argsType: 'multiple'
		});
	}

	run = async (message, args) => {
		const { guild } = message;

		if (args.length > 1) {
			message.channel.send(`Richtiger syntax: ${guild.commandPrefix}modinfo <User @ /> ID>`);
			return;
		}

		let id = '';
		const target = message.mentions.users.first();
		if (target) {
			id = target.id;
		} else {
			id = args[0];
		}

		const user = this.client.users.cache.find((user) => user.id === id);
		const member = guild.members.cache.get(id);

		const joinDate = new Date(member.joinedTimestamp).toLocaleDateString();
		const discordJoin = new Date(user.createdTimestamp).toLocaleDateString();

		const wasMuted = await muteSchema.find({
			userId: id,
			guildId: guild.id
		});

		const currentMute = await muteSchema.findOne({
			userId: id,
			guildId: guild.id,
			current: true
		});

		const wasBanned = await banSchema.find({
			userId: id,
			guildId: guild.id
		});

		const currentBan = await banSchema.findOne({
			userId: id,
			guildId: guild.id,
			current: true
		});

		let muteCount = false;
		if (wasMuted.length > 0) {
			muteCount = true;
		}
		const banCount = wasBanned.length;

		let muteReason = [];
		let muteCreated = [];
		let mutes = '';

		for (var i = 0; i < wasMuted.length; i++) {
			muteReason[i] = wasMuted[i].reason;
			muteCreated[i] = wasMuted[i].createdAt;
			mutes += `${i + 1}: ${muteReason[i]} > ${muteCreated[i]}\n`;
		}

		let banReason = [];
		let banCreated = [];
		let bans = '';

		for (var i = 0; i < wasBanned.length; i++) {
			banReason[i] = wasBanned[i].reason;
			banCreated[i] = wasBanned[i].createdAt;
			bans += `${i + 1}: ${banReason[i]} > ${banCreated[i]}\n`;
		}

		const embed = new MessageEmbed()
			.setAuthor(`Mod Info for ${user.tag}`, user.displayAvatarURL() || '')
			.addField(`Joined Discord:`, `${discordJoin}`)
			.addField(`Joined Server:`, `${joinDate}`)
			.addField(`Currently Muted:`, `${currentMute ? 'Yes' : 'No'}`)
			.addField(`Previous Mutes:`, `${muteCount ? mutes : '0'}`)
			.addField(`Currently Banned`, `${currentBan ? 'Yes' : 'No'}`)
			.addField(`Previous Bans:`, `${banCount ? bans : '0'}`);

		message.channel.send(embed);

		var now2 = new Date();
		console.log(`${dateformat(now2, "yyyy-mm-dd' 'HH:MM:ss")} UTC > ${message.author.id} > ${message.content}`);
	};
};
