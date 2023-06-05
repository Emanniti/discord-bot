require('dotenv').config()
const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');
const eventHandler = require('./src/handlers/eventHandler');

const client = new Client({
    intents: [
        //ACCESSO AL SERVER
        IntentsBitField.Flags.Guilds,
        //ACCESSO AI MEMBRI DEL SERVER
        IntentsBitField.Flags.GuildMembers,
        //ACCESSO AI MESSAGGI
        IntentsBitField.Flags.GuildMessages,
        //ACCESSO A LEGGERE I MESSAGGI
        IntentsBitField.Flags.MessageContent,
    ]
});

// client.on("ready", (c) => {
//     //SE VOGLIO ELIMINARE I COMANDI
      
//     console.log("Il bot:", c.user.username, "e' online!")

// })


// //COMANDO
// client.on('interactionCreate', (interaction) => {
//     if (!interaction.isChatInputCommand()) return;

//     if (interaction.commandName === "add") {
//         const num1 = interaction.options.get('primo-numero').value;
//         const num2 = interaction.options.get('secondo-numero').value;
//         let somma = num1 + num2;

//         interaction.reply(`La somma dei 2 numeri e': ${somma}`)
//     }

//     if (interaction.commandName === "embed") {
//         const embed = new EmbedBuilder().setTitle("Titolo embed")
//             .setDescription("Descrizione embed")
//             .setColor("Red")
//             .addFields({ name: "Titolo field", value: "Some random value", inline: true }, { name: "Titolo field", value: "Some random value", inline: true }, { name: "Titolo field", value: "Some random value", inline: false });

//         interaction.reply({ embeds: [embed] });
//     }
// })

// //MESSAGGIO
// client.on('messageCreate', (message) => {
//     if (message.author.bot) {
//         return;
//     }
//     if (message.channelId !== "1113526919909085194") {
//         return;
//     }

//     if (message.content === 'embed') {
//         const embed = new EmbedBuilder().setTitle("Test messaggio inviato")
//             .setDescription("Risponde con un embed di chia ha inviato il messaggio e il messaggio.")
//             .setColor("Red")
//             .addFields({ name: "Messaggio", value: `Il messaggio e' stato inviato da: ${message.author}`, inline: true }, { name: "Messaggio", value: `${message.content}`, inline: true }, { name: "Offesa", value: "Sembri il cazzo veramente o frat", inline: false });

//             message.reply({ embeds: [embed] });
//     }

// })

eventHandler(client);


client.login(process.env.TOKEN);
