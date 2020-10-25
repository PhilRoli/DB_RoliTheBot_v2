module.exports = (client) => {
	client.on('guildMemberAdd', (member) => {
		member.roles.add(member.guild.roles.cache.find((role) => role.id == '763713724979871744'), 'auto added.');
		member.roles.add(member.guild.roles.cache.find((role) => role.id == '763714092615204884'), 'auto added.');
		member.roles.add(member.guild.roles.cache.find((role) => role.id == '769730347784077312'), 'auto added.');
	});
};
