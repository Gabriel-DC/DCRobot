const Discord = require('discord.js');
const axios = require('axios');
const { token, dev_ID, prefixo } = require('./config.json');

const http = require('http');

var debug = false; // ALTERAR PARA DEBUGAR

const bot = new Discord.Client();

//// EVENTO DE QUANDO O BOT INICIAR
bot.once('ready', () => {
    console.log('Bot rodando....');

    bot.user.setStatus('dnd');
    if (debug) {
        bot.user.setActivity('TÔ EM MANUTENÇÃO', { type: 'PLAYING' })
            .then(presence => console.log('MODO: DEBUG / ' + presence.activities[0].name));
    } else {
        bot.user.setActivity('ONLINE', { type: 'PLAYING' })
            .then(presence => console.log('MODO: PRODUÇÃO / ' + presence.activities[0].name));
    }

})



//// EVENTO DE NOVA MENSAGEM

bot.on('message', async(message) => { // Função que é acionada sempre que chegar uma nova mensagem

    let msg = message.content; // Conteúdo da mensgem
    let sender = message.author; // Pega o autor da mensagem

    if (msg === 'dc?' || msg === 'DC?') {
        message.channel.send('DC é lindo');
    }

    if (!msg.startsWith(prefixo) || message.author.bot) return; // RETONA SE A MENSAGEM NÃO FOR UM COMANDO OU TER VINDO DE OUTRO BOT

    if (debug === true && sender.id !== dev_ID.gabriel) { // QUANDO EM MODO DE DEBUG, SOMENTE DESENVOLVEDORES CONSEGUEM USAR OS COMANDOS
        message.channel.send('Estou em manutenção, aguenta ae!');
        return;
    }

    // Separa o comando dos argumentos
    const args = message.content
        .slice(prefixo.length)
        .replace(/\s{2,}/g, ' ')
        .split(' ');
    const command = args.shift().toLowerCase();


    // TESTE DE ARGUMENTOS

    if (command === 'args') {
        if (!args.length) {
            return message.channel.send(`Nenhum argumento fornecido, ${message.author}!`);
        }

        message.channel.send(`Comando: ${command}\nArgumentos: ${args}`);
    }

    ////// COMANDOS


    if (command === 'gato') {

        if (args.length && Number.isInteger(Number.parseInt(args[0]))) {

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

                        message.channel.send(new Discord.MessageAttachment(line.match(/http(s|):\/\/purr[^"]*/)[0]));
                        console.log(line);
                    });
                });

                req.end();

                /* await message.channel.send(`http://aws.random.cat/view/${args[0]}`); */

            } else {
                message.channel.send('A gente só tem (por enquanto) 1677 gatinhos');
            }
            return;
        }
        const response = await axios.get('http://aws.random.cat/meow'); // Busca uma imagem aleatória com o axios
        console.log(sender, response.data); // Loga o resultado (debug only)

        message.channel.send(response.data.file); // Retorna o resultado do axios


    } else if (command === 'muffin') {

        const response = new Discord
            .MessageAttachment('https://www.tynker.com/projects/screenshot/5c6737de70b002054960a61d/muffin-time.png'); //Pega a foto da URL
        message.channel.send(response); // Envia a foto como resposta

    } else if (command === 'foto') {

        const image = new Discord.MessageAttachment(sender.avatarURL()) // Pega a foto do sender
        message.reply(image); // Retorna a foto do sender


    } else if (command === 'entracarai') {

        if (message.member.voice.channel) { // Verifica se quem chamou está em um canal de voz
            await message.member.voice.channel.join(); // conecta no canal de voz
            console.log('entrei'); // debug only
        } else {
            message.reply('Entra em um canal de voz primeiro carai');
        }


    } else if (command === 'vaza') {

        if (message.member.voice.channel === null) { // Verifica se quem chamou está em um canal de voz, se não estiver retorna uma mensagem
            message.reply('Ta doidão? vazar da onde ?!');
        } else {
            message.member.voice.channel.leave(); // Sai do canal de voz
        }


    } else if (command === 'ping') {
        message.reply('Pong!'); // Retorna 'Pong!'


    } else if (command === 'server') {
        message.channel.send(`Nome do servidor: ${message.guild.name} \nTotal de membros: ${message.guild.memberCount}`); // Retorna características do server
    }

    ////////////////////////// DEV COMMANDS // DEBUG MODE

    if (sender.id === dev_ID.gabriel) { // COMPARA SE FOI O         
        if (msg === prefixo + 'estado') { // Apenas para verificar o funcionamento
            message.reply('RODANDO :)'); // Resposta
        }
    }
})

bot.login(token); // PUT YOUR TOKEN HERE