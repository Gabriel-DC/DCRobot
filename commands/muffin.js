const Discord = require('discord.js');
module.exports = {
    name: 'muffin',
    description: 'Retorna a foto do muffin',
    execute(message, args) {
        const response = new Discord
            .MessageAttachment('https://www.tynker.com/projects/screenshot/5c6737de70b002054960a61d/muffin-time.png'); //Pega a foto da URL
        message.channel.send(response); // Envia a foto como resposta
    },
};