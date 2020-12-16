const Commando = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class RaidListeCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'raidlist',
			group: 'misc',
			aliases: [ 'rl' ],
			memberName: 'raidliste',
			description: 'Creates a raid list',
			argsType: 'multiple'
		});
	}

	run = async (message, args) => {
		const dscpicurl = 'https://www.bungie.net/common/destiny2_content/icons/74e2d7cbdc841249fbc4f4cad42efbe3.jpg';
		const lwpicurl = 'https://www.bungie.net/common/destiny2_content/icons/ecc3e805988dd9947f37c46428e4a12b.jpg';
		const gospicurl = 'https://www.bungie.net/common/destiny2_content/icons/157137504ac5de72705ee6188764ee69.jpg';
		let raidpicurl = '';
		let raidname = '';
		var char = [];

		let chars = args[1];

		console.log(chars);
		console.log(chars.lenght);

		if (args[1]) {
			if (args[1].lenght === 6) {
				for (let index = 0; index < 6; index++) {
					char[index] = args[1].charAt(index);
				}
			} else {
				message.channel.send('Die angegeben chrakter anzahl war nicht 6!');
			}
		} else {
			message.channel.send('Es wurden keine charaktere angegeben');
		}

		switch (args[0]) {
			case 'dsc':
				raidname = 'Deep Stone Crypt';
				raidpicurl = dscpicurl;
				break;
			case 'lw':
				raidname = 'Last Whish';
				raidpicurl = lwpicurl;
				break;
			case 'gos':
				raidname = 'Garden of Salvation';
				raidpicurl = gospicurl;
				break;
			default:
				message.channel.send(
					'The given raid name is not viable. Please use the following syntax: !raidlist <dsc / lw / gos>'
				);
				return;
				break;
		}

		let embed = new MessageEmbed().setTitle(`${raidname}`).setThumbnail(raidpicurl).setColor('#ff0000').addFields(
			{
				name: `[${char[0]}]`,
				value: '-'
			},
			{
				name: `[${char[1]}]`,
				value: '-'
			},
			{
				name: `[${char[2]}]`,
				value: '-'
			},
			{
				name: `[${char[3]}]`,
				value: '-'
			},
			{
				name: `[${char[4]}]`,
				value: '-'
			},
			{
				name: `[${char[5]}]`,
				value: '-'
			}
		);

		message.channel.send({ embed: embed });
	};
};
