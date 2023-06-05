require('dotenv').config()
const { EmbedBuilder } = require('discord.js');

module.exports = (interaction) => {

    if(interaction.channelId !== process.env.CANALE_BOT){
        const embed = new EmbedBuilder().setTitle("Canale sbagliato!")
        .setDescription("Comando inserito nel canale errato!")
        .setColor("Red")
        .addFields({ name: `Canale corretto:`, value: "``` bot-test ```", inline: true });

        interaction.reply({ embeds: [embed], ephemeral: true  });
        return false;
    } else {
        return true;
    }

}