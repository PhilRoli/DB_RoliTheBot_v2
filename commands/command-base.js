const { prefix } = require('../config.json');
var time = new Date();

const vaidatePermissions = (permissions) => {
	const validPermissions = [
		'CREATE_INSTANT_INVITE',
		'KICK_MEMBERS',
		'BAN_MEMBERS',
		'ADMINISTRATOR',
		'MANAGE_CHANNELS',
		'MANAGE_GUILD',
		'ADD_REACTIONS',
		'VIEW_AUDIT_LOG',
		'PRIORITY_SPEAKER',
		'STREAM',
		'VIEW_CHANNEL',
		'SEND_MESSAGES',
		'SEND_TTS_MESSAGES',
		'MANAGE_MESSAGES',
		'EMBED_LINKS',
		'ATTACH_FILES',
		'READ_MESSAGE_HISTORY',
		'MENTION_EVERYONE',
		'USE_EXTERNAL_EMOJIS',
		'VIEW_GUILD_INSIGHTS',
		'CONNECT',
		'SPEAK',
		'MUTE_MEMBERS',
		'DEAFEN_MEMBERS',
		'MOVE_MEMBERS',
		'USE_VAD',
		'CHANGE_NICKNAME',
		'MANAGE_NICKNAMES',
		'MANAGE_ROLES',
		'MANAGE_WEBHOOKS',
		'MANAGE_EMOJIS'
	];
	for (const permission of permissions) {
		if (!validPermissions.includes(permission)) {
			throw new Error(`Unknown permission node "${permission}"`);
		}
	}
};

module.exports = (client, commandOptions) => {
	let {
		commands,
		expectedArgs = '',
		permissionError = 'You do not have permission',
		minArgs = 0,
		maxArgs = null,
		permissions = [],
		requiredRoles = [],
		callback
	} = commandOptions;

	// Ensure the command and aliases are in array
	if (typeof commands === 'string') {
		commands = [ commands ];
	}

	console.log(`Regestering command "${commands[0]}"`);

	// ensure the permission are in array
	if (permissions.length) {
		if (typeof permissions === 'string') {
			permissions = [ permissions ];
		}
		vaidatePermissions(permissions);
	}

	// Listen for messages
	client.on('message', (message) => {
		const { member, content, guild } = message;

		for (const alias of commands) {
			if (content.toLowerCase().startsWith(`${prefix}${alias.toLowerCase()}`)) {
				// a command has been ran

				// Ensure permissions
				for (const permission of permissions) {
					if (!member.hasPermission(permission)) {
						message.channel.send(permissionError);
						return;
					}
				}

				// Ensure Roles
				for (const requiredRole of requiredRoles) {
					const role = guild.cache.find((role) => role.name === requiredRole);

					if (!role || member.roles.cache.has(role.id)) {
						message.channel.send(`You must have the "${requiredRole}" to use this command`);
					}
				}

				// Split on any number of spaces
				const arguments = content.split(/[ ]+/);

				// remove 1. element
				arguments.shift();

				// Check for correct number of args
				if (arguments.length < minArgs || (maxArgs !== null && arguments.length < maxArgs)) {
					message.channel.send(`Incorrect Sytax! Use ${prefix}${alias} ${expectedArgs}`);
					return;
				}

				// Handle coustom comammand code
				callback(message, arguments, arguments.join(''), client);
				console.log(`--${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}--`);
				console.log(`${member} ran ${prefix}${alias}`);

				return;
			}
		}
	});
};
