module.exports = {
	commands: 'invitebot',
	minArgs: 0,
	maxArgs: 0,
	description: 'Replies with a Link to invite this Bot',
	callback: (message, arguments, text) => {
		var inviteLink = '<:inviteLink:767856810090037308>';
		message.channel.send(
			`${inviteLink} https://discord.com/api/oauth2/authorize?client_id=766273088836861962&permissions=8&scope=bot ${inviteLink}`
		);
	},
	permissions: [ 'ADMINISTRATOR' ]
};
