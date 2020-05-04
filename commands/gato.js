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









        // REVISAR DEPOIS

        /* if (args.length && Number.isInteger(Number.parseInt(args[0]))) {

            if (Number.parseInt(args[0]) <= 1677 && Number.parseInt(args[0]) >= 0) {

                // O CÓDIGO DENTRO DESDE IF NÃO POSSUI UMA BOA PERFOMANCE
                // REVISAR PARA OTIMIZAR

                const options = {
                    host: "aws.random.cat",
                    port: 80,
                    path: `/view/${args[0]}`
                };

                var content = "";

                var req = http.request(options, function(res) {
                    res.setEncoding("utf8");
                    res.on("data", function(chunk) {
                        content += chunk;
                    });

                    res.on("end", function() {
                        let line = content.match(/<a[\s\S]+id="cat"/)[0];

                        // message.channel.send(new Discord.MessageAttachment(line.match(/http(s|):\/\/purr[^"]*\/)[0]));
                        console.log(line);
                    });
                });

                req.end();

                //await message.channel.send(`http://aws.random.cat/view/${args[0]}`);

            } else {
                message.channel.send('A gente só tem (por enquanto) 1677 gatinhos');
            }
            return;
        } */
    },
};