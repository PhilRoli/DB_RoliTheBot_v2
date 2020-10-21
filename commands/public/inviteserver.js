module.exports = {
	commands: 'inviteserver',
	minArgs: 0,
	maxArgs: 0,
	description: 'Replies with a invite to the Test Server',
	callback: (message, arguments, text) => {
        var inviteLink = '<:inviteLink:767856810090037308>';
		message.channel.send(`${inviteLink} https://discord.gg/2TNfDaX ${inviteLink}`)
	},
	permissions: [ 'ADMINISTRATOR' ]
};
