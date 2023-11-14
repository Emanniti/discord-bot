require('dotenv').config()
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const controlChannel = require('../../utils/controlChannel');
const embedForLogs = require('../../utils/embedForLogs');
const LogsError = require('../../utils/LogsError');
const fetch = require("node-fetch");

function handleEmbedMatches(data, imageUrl, nome) {

    const exampleEmbed = {
        color: 0x0099ff,
        title: 'Ultime 5 partite',
        description: `Partite di: ${nome}`,
        fields: [],
        thumbnail: {
            url: 'https://www.citypng.com/public/uploads/preview/-416031338016ay54imofx.png',
        },
        image: {
            url: imageUrl,
        },
    };
    data.map(record => {
        const teamVincitore = record.teams.red.has_won === true ? record.players.red : record.players.blue;
        const teamVincitoreBlue = teamVincitore.map(item => item.name.toLowerCase()).includes(nome.toLowerCase())

        let partita = {}
        Object.assign(partita, record.metadata.map !== undefined ? { name: `Mappa:` } : null);
        Object.assign(partita, record.metadata.map !== undefined ? { value: `${record.metadata.map}-${record.metadata.mode}` } : null);
        Object.assign(partita, { inline: true });
        exampleEmbed.fields.push(partita)
        partita = {}
        Object.assign(partita, record.metadata.rounds_played !== undefined ? { name: "Round:" } : null)
        Object.assign(partita, record.metadata.rounds_played !== undefined ? { value: record.metadata.rounds_played } : null)
        Object.assign(partita, { inline: true });
        exampleEmbed.fields.push(partita)
        partita = {}
        Object.assign(partita, record.metadata.game_length !== undefined ? { name: "Vittoria:" } : null)
        Object.assign(partita, record.metadata.game_length !== undefined ? { value: teamVincitoreBlue ? "✅" : "❌" } : null)
        Object.assign(partita, { inline: true });
        exampleEmbed.fields.push(partita)
        partita = {}
    })
    return exampleEmbed
}

module.exports = {
    name: "valorant-stats",
    description: "Recupera le statistiche di valorant",

    options: [
        {
            name: "nome",
            description: "Nome account",
            required: true,
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "id",
            description: "#",
            required: true,
            type: ApplicationCommandOptionType.String,
        },
    ],

    callback: async (client, interaction) => {

        try {
            if (controlChannel(interaction)) {
                console.info(`[${interaction.commandName.toUpperCase()}] ${interaction.user.username}`)
                let embed = new EmbedBuilder();

                const nome = interaction.options.get('nome').value.toString();
                const id = interaction.options.get('id').value.toString();

                const responseProfile = await fetch(`https://api.henrikdev.xyz/valorant/v1/account/${encodeURI(nome)}/${encodeURI(id)}`)
                let dataProfile = await responseProfile.json();

                const responseMatch = await fetch(`https://api.henrikdev.xyz/valorant/v3/matches/eu/${encodeURI(nome)}/${encodeURI(id)}`)
                // const responseMatch = await fetch(`https://api.henrikdev.xyz/valorant/v3/matches/eu/lafrasta/euw`)
                let dataMatch = await responseMatch.json()

                const responseElo = await fetch(`https://api.henrikdev.xyz/valorant/v1/mmr/eu/${encodeURI(nome)}/${encodeURI(id)}`)
                let dataElo = await responseElo.json()

                if (dataProfile.status !== 200 && dataElo.status !== 200) {
                    console.log("Non trovato");

                    embed = new EmbedBuilder().setTitle("Account non trovato")
                        .setColor("Red")
                        .addFields(
                            { name: `Nome:`, value: nome, inline: true },
                            { name: `Id:`, value: id, inline: true });

                    interaction.reply({ embeds: [embed], ephemeral: true });
                    embedForLogs(client, interaction)

                } else {

                    embed = new EmbedBuilder().setTitle(`Statistiche di valorant di: ${nome}`)
                        .setDescription(`Valorant stats`)
                        .setColor("Blue")
                        .setThumbnail(dataElo.data.images.small)
                        .addFields({ name: `Nome: `, value: nome, inline: true },
                            { name: `Livello account:`, value: `${dataProfile.data.account_level}`, inline: true },
                            { name: `TAG: `, value: dataProfile.data.tag, inline: true },
                            { name: `ELO: `, value: dataElo.data.currenttierpatched, inline: true },
                            { name: `Ultimo aggiornamento: `, value: `${dataProfile.data.last_update}`, inline: false },
                        )
                        .setImage(dataProfile.data.card.wide);

                     interaction.reply({
                        embeds: [embed, handleEmbedMatches(dataMatch.data, dataProfile.data.card.wide, nome)]
                    });
                    embedForLogs(client, interaction)
                }

            }
        } catch (error) {
            console.log(error)
            LogsError(client, interaction, error)
        }


    }
}