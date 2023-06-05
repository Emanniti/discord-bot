require('dotenv').config()
const { EmbedBuilder } = require('discord.js');
const controlChannel = require('../../utils/controlChannel');
const embedForLogs = require('../../utils/embedForLogs');
const LogsError = require('../../utils/LogsError');

module.exports = {
    name: "ping",
    description: "Riponde con pong!",
    // devOnly: Boolean
    // testOnly: Boolean
    // options: Object[]
    // deleted: true

    callback: (client, interaction) => {

        // console.log(interaction)
        try {
            if (controlChannel(interaction)) {
                // interaction.reply(`PONG!!! ${client.ws.ping}ms`)
                interaction.reply(`PONG!!!`)
                embedForLogs(client, interaction)
            }

        } catch (error) {
            LogsError(client, interaction, error)
        }
    }
}