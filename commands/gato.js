const axios = require('axios');
//const http = require('http');
const Discord = require('discord.js');
module.exports = {
    name: 'gato',
    description: 'retorna foto de gato',
    async execute(message, args) {

        const response = await axios.get('http://aws.random.cat/meow'); // Busca uma imagem aleatória com o axios
        console.log(message.author, response.data); // Loga o resultado (debug only)

        message.channel.send(new Discord.MessageAttachment(response.data.file)); // Retorna o resultado do axios
    }
};