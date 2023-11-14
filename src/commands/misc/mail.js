require('dotenv').config()
const { ApplicationCommandOptionType } = require('discord.js');
const nodemailer = require('nodemailer');
const controlChannel = require('../../utils/controlChannel');
const embedForLogs = require('../../utils/embedForLogs');
const LogsError = require('../../utils/LogsError');

module.exports = {
    name: "email",
    description: "Manda email",
    options: [
        {
            name: "destinatario",
            description: "Destinatario della mail",
            required: true,
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "soggetto",
            description: "Soggetto della mail",
            required: true,
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "testo",
            description: "Testo della mail",
            required: true,
            type: ApplicationCommandOptionType.String,
        },
    ],

    callback: (client, interaction) => {
//DiscordBot1995!
        try {
            if (controlChannel(interaction)) {
                console.info(`[${interaction.commandName.toUpperCase()}] ${interaction.user.username}`)
                const destinatario = interaction.options.get('destinatario').value;
                const soggetto = interaction.options.get('soggetto').value;
                const testo = interaction.options.get('testo').value;

                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: 'emanueleilpocho99@gmail.com',
                      pass: 'rhupjuotaatbndgv'
                    }
                  });


                  var mailOptions = {
                    from: 'emanueleilpocho99@gmail.com',
                    to: destinatario,
                    subject: soggetto,
                    text: testo
                  };

                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                        interaction.reply({content: "Email inviata correttamente!", ephemeral: true})
                        embedForLogs(client, interaction)
                    }
                  });

            }

        } catch (error) {
            LogsError(client, interaction, error)
        }
    }
}