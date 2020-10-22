const Commando = require('discord.js-commando');

module.exports = class DeleteCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'delete',
			group: 'moderation',
			aliases: [ 'del' ],
			memberName: 'delete',
			description: 'Deletes the given ammount of messages',
			clientPermissions: [ 'MANAGE_MESSAGES' ],
			userPermissions: [ 'MANAGE_MESSAGES' ]
		});
	}

	async run(message, args) {
        
    }
};
