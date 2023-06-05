const { PermissionFlagsBits } = require('discord.js');
const LogsError = require('../../utils/LogsError');
const embedForLogs = require('../../utils/embedForLogs');

module.exports = {
    name: "eliminate-message",
    description: "Elimina tutti i messaggi",
    devOnly: true,

    callback: async (client, interaction) => {
        try {
            const Messages = await interaction.channel.messages.fetch({ limit: 100 });
    
            console.log(Messages)
    
            Messages.forEach(msg => { // Checking if the message author has a certain ID.
                msg.delete()
                console.log("Messaggio eliminato...")
            })
            console.log("Messaggi eliminati correttamente!")
            embedForLogs(client, interaction)
        } catch (error) {
            console.log(error)
            LogsError(client, interaction, error)
        }
    }
}