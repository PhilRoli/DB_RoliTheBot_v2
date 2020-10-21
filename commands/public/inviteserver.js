module.exports = {
	commands: 'inviteserver',
	minArgs: 0,
	maxArgs: 0,
	callback: (message, arguments, text) => {
        var inviteLink = '<:inviteLink:767856810090037308>';
		message.channel.send(`${inviteLink} https://discord.gg/2TNfDaX ${inviteLink}`)
	},
};
