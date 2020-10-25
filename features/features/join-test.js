module.exports = (client) => {
	client.on('guildMemberAdd', (member) => {
		console.log(`${member.id} has joined`);
	});

	client.on('guildMemberLeave', (member) => {
		console.log(`${member.id} has left`);
	});
};
