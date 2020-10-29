const memberCount = require('./member-count');

const { MessageEmbed } = require('discord.js');

module.exports = (client) => {
	const hexNumbers = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F' ];

	client.on('guildMemberAdd', (member) => {
		let hexCol = '#';

		for (let i = 0; i < 6; i++) {
			let random = Math.floor(Math.random() * hexNumbers.length);
			hexCol += hexNumbers[random];
		}

		let embed = new MessageEmbed()
			.setTitle(`**Welcome to the ${member.guild} Server**`)
			.setColor(hexCol)
			.setThumbnail(member.guild.iconURL())
			.addFields(
				{
					name: 'Get Startd',
					value:
						'Head over to <#557338119389839360> and click on the ✅ Reaction to get acces to more of the Server!'
				},
				{
					name: 'Claiming Roles',
					value:
						'To claim roles for your favourite game, go to <#769729305394937887> after reacting in <#557338119389839360> and click on the emojis for the games you play'
				},
				{
					name: 'Custom Bot',
					value: `I'm a Bot developed and maintained by <@433645584696475653>, to get a list of all commands type \`!help\` either in here, or into <#562358595291709449>. For further question please contact my Owner`
				}
			);

		member.send({ embed: embed });
	});
};
