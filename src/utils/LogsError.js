const { EmbedBuilder } = require('discord.js');

module.exports = (client, interaction, error) => {

    const embedLog = new EmbedBuilder().setTitle("---------------------❌❌❌LOG ERROR❌❌❌---------------------")
        .setColor("Red")
        .addFields(
            { name: `Comando:`, value: interaction.commandName.toUpperCase(), inline: false },
            { name: `Lanciato da:`, value: interaction.user.username, inline: false },
            { name: `Errore:`, value: error.toString(), inline: false });

            //ID CANALE LOGS ERROR
    client.channels.cache.get("1174066556364402739").send({ embeds: [embedLog] })
}