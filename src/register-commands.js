require('dotenv').config()
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [
    {
        name: 'add',
        description: 'aggiunge 2 numeri',
        options: [
            {
                name: 'primo-numero',
                description: 'Il primo numero',
                type: ApplicationCommandOptionType.Number,
                choices: [
                    {
                        name: "uno",
                        value: 1
                    },
                    {
                        name: "due",
                        value: 2
                    },
                    {
                        name: "tre",
                        value: 3
                    }
                ],
                required: true,
            },
            {
                name: 'secondo-numero',
                description: 'Il secondo numero',
                type: ApplicationCommandOptionType.Number,
                choices: [
                    {
                        name: "uno",
                        value: 1
                    },
                    {
                        name: "due",
                        value: 2
                    },
                    {
                        name: "tre",
                        value: 3
                    }
                ],
                required: true,
            },
        ]
    },
    {
        name: 'embed',
        description: 'Lancia un embed',
    },

];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log("Registrando slash commands...");

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        )

        console.log("Slash command registrato correttamente!");
    } catch (error) {
        console.log("ERRORE:", error)
    }
})();