const { EmbedBuilder } = require('discord.js');

module.exports = (client, interaction) => {

    // console.log(client.channels)

    const embedLog = new EmbedBuilder().setTitle("----------------------ℹ️ℹ️ℹ️LOGℹ️ℹ️ℹ️----------------------")
        .setColor("Yellow")
        .addFields({ name: `Comando:`, value: interaction.commandName.toUpperCase(), inline: false },
        { name: `Lanciato da:`, value: interaction.user.username, inline: false },
        { name: `Tempo impiegato:`, value: `${client.ws.ping.toString()} MS`, inline: true },
        { name: `In data:`, value: new Date().toString(), inline: false });
        
        //ID CANALE LOGS
    client.channels.cache.get("1113609272216014870").send({ embeds: [embedLog] })
}  