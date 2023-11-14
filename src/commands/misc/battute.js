require('dotenv').config()
const { ApplicationCommandOptionType } = require('discord.js');
const controlChannel = require('../../utils/controlChannel');
const embedForLogs = require('../../utils/embedForLogs');
const embedForLogsError = require('../../utils/LogsError');

insulti = ["Sei un coglione", "Mi scopo tua madre"]

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

module.exports = {
    name: "offendi",
    description: "Prendi in giro qualcuno...",

    options: [
        {
            name: "vittima",
            description: "La vittima",
            required: true,
            type: ApplicationCommandOptionType.Mentionable,
        },
    ],

    callback:  (client, interaction) => {
        try {
            console.info(`[${interaction.commandName.toUpperCase()}] ${interaction.user.username}`)
            const vittima = interaction.options.get('vittima').user.username;

            if (controlChannel(interaction)) {
                interaction.reply(vittima + " " + insulti[randomIntFromInterval(0, 1)])
                embedForLogs(client, interaction)
            }
        } catch (error) {
            embedForLogsError(client, interaction, error)
        }
    }
}