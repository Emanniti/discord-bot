const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: "ban",
    description: "Banna un player",
    // devOnly: Boolean
    // testOnly: Boolean
     options: [
        {
            name: "user-name",
            description: "Username del player da bannare!!",
            required: true,
            type: ApplicationCommandOptionType.Mentionable,
        },
        {
            name: "motivazione",
            description: "Motivazione del ban",
            required: true,
            type: ApplicationCommandOptionType.String,
        }
     ],

     permissionRequired: [PermissionFlagsBits.Administrator],

    callback: (client, interaction) => {
        interaction.reply(`Ban...`)
    }
}