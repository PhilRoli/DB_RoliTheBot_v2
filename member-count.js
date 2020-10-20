module.exports = (client) => {
	const channelID = '768103152389324820';

	const updateMembers = (guild) => {
		const channel = guild.channels.cache.get(channelID);
		channel.setName(`Members: ${guild.memberCount}`);
	};

	client.on('guildMemberAdd', (member) => updateMembers(member.guild));
	client.on('guildMemberRemove', (member) => updateMembers(member.guild));
};
