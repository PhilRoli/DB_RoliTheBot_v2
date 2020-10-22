const Commando = require('discord.js-commando');

module.exports = class ClearChannelCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'clearchannel',
            group: 'moderation',
            aliases: ['cc', 'clearchannel'],
            memberName: 'clearchannel',
            description: 'deletes all messages under 14 days old',
            clientPermissions: ['MANAGE_MESSAGES'],
            userPermissions: ['MANAGE_MESSAGES']
        })
    }

    async run(message) {
        message.channel.messages.fetch().then((results) => {
			message.channel.bulkDelete(results);
		});
    }
}