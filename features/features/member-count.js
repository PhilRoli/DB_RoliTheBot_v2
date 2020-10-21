const config = require('@root/config.json');

module.exports = (client) => {
	const channelID = config.memberchannel;

	const updateMembers = (guild) => {
		const channel = guild.channels.cache.get(channelID);
		if (channel) {
			channel.setName(`Members: ${guild.memberCount}`);
		}
	};

	client.on('guildMemberAdd', (member) => updateMembers(member.guild));
	client.on('guildMemberRemove', (member) => updateMembers(member.guild));
};
