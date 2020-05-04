const Discord = require('discord.js');
module.exports = {
    name: 'foto',
    description: 'Retorna a foto do membro que mandou o comando',
    execute(message, args) {
        if (!args.lenght) {
            console.log(message.guild.members)
        }

        const image = new Discord.MessageAttachment(message.author.avatarURL()) // Pega a foto do sender
        message.reply(image); // Retorna a foto do sender
    },
};