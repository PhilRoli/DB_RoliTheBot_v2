/*
MongoDB schema für bans
*/

const mongoose = require('mongoose');

const reqString = {
	type: String,
	required: true
};

const banSchema = mongoose.Schema(
	{
		// ID des Users
		userId: reqString,
		// Server ID
		guildId: reqString,
		// Grund
		reason: reqString,
		// ID des Mod's der die Aktion durchgeführt hat
		staffId: reqString,
		// Tag des Mod's
		staffTag: reqString,
		// Wann der Ban ausläuft
		expires: {
			type: Date,
			required: true
		},
		// Ob der ban derzeit aktiv ist
		current: {
			type: Boolean,
			required: true
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('bans', banSchema);
