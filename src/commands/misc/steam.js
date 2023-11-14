require('dotenv').config()
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const controlChannel = require('../../utils/controlChannel');
const embedForLogs = require('../../utils/embedForLogs');
const LogsError = require('../../utils/LogsError');
const fetch = require("node-fetch");

module.exports = {
    name: "steam-stats",
    description: "Recupera le statistiche di steam",
    // devOnly: Boolean
    // testOnly: Boolean
    // options: Object[]
    // deleted: true

    options: [
        {
            name: "steam-id",
            description: "STEAM ID",
            required: true,
            type: ApplicationCommandOptionType.String,
        },
    ],


    callback: async (client, interaction) => {

        try {
            function handleStatoSteam(params) {
                switch (params) {
                    case 0:
                        return "Offline ⬛"

                    case 1:
                        return "Online 🟩"

                    case 2:
                        return "Occupato 🟥"

                    case 3:
                        return "Away 🟨"

                    case 4:
                        return "Snooze"

                    case 5:
                        return "Looking to trade"

                    case 6:
                        return "Looking to play"

                    default:
                        return "Private"
                }
            }

            if (controlChannel(interaction)) {
                console.info(`[${interaction.commandName.toUpperCase()}] ${interaction.user.username}`)
                let embed = new EmbedBuilder();

                const steamId = interaction.options.get('steam-id').value;
                
                const responseProfile = await fetch("http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=FB401232604477A3C8B1A14958177736&steamids=" + steamId)
                dataProfile = await responseProfile.json();
                
                //SE NON TROVA NESSUN PROFILO 
                if (dataProfile.response.players.length < 1) {
                    embed = new EmbedBuilder().setTitle("Account non trovato")
                    .setColor("Red")
                    .addFields({ name: `SteamId:`, value: steamId, inline: true });
                    
                    interaction.reply({ embeds: [embed], ephemeral: true });
                    embedForLogs(client, interaction)
                } else {
                    let player = dataProfile.response.players[0];
                    
                    const responseGames = await fetch("http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=FB401232604477A3C8B1A14958177736&steamid=" + steamId + "&include_appinfo=true&include_played_free_games=true&format=json")
                    dataGames = await responseGames.json();
                    let games = dataGames.response.game_count;
                    
                    embed = new EmbedBuilder().setTitle(player.personaname)
                    .setDescription(`Statistiche per il profilo Steam di: ${player.personaname}`)
                    .setColor("Blue")
                    .addFields({ name: `Stato:`, value: handleStatoSteam(player.personastate), inline: true },
                            { name: `Giochi totali:`, value: `${games}`, inline: true },
                            { name: `Ultima volta online:`, value: new Date(player.lastlogoff * 1000).toLocaleDateString('it-IT'), inline: true },
                            { name: `Link steam:`, value: `${player.profileurl}`, inline: false },
                        );
                    interaction.reply({ embeds: [embed] });
                    embedForLogs(client, interaction)
                }

            }
        } catch (error) {
            LogsError(client, interaction, error)
        }


    }
}