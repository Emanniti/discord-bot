require('dotenv').config()
const { EmbedBuilder } = require('discord.js');
const controlChannel = require('../../utils/controlChannel');
const embedForLogs = require('../../utils/embedForLogs');
const LogsError = require('../../utils/LogsError');

module.exports = {
    name: "help",
    description: "Lista comandi",

    callback: (client, interaction) => {

        try {
            if (controlChannel(interaction)) {
                console.info(`[${interaction.commandName.toUpperCase()}] ${interaction.user.username}`)
                interaction.reply("/help - Visualizza tutti i comandi /steam-stats - Visualizza le statistiche di steam", mention_author=true)
                interaction.reply("/help - Visualizza tutti i comandi /steam-stats - Visualizza le statistiche di steam", mention_author=true)
                interaction.reply("/help - Visualizza tutti i comandi /steam-stats - Visualizza le statistiche di steam", mention_author=true)
                embedForLogs(client, interaction)
            }

        } catch (error) {
            LogsError(client, interaction, error)
        }
    }
}