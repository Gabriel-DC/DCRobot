const fs = require('fs');
const Discord = require('discord.js');
const { token, dev_ID, prefixo } = require('./config.json');

var debug = false; // ALTERAR PARA DEBUGAR

const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}

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

    if (!message.content.startsWith(prefixo) || message.author.bot) return; // RETONA SE A MENSAGEM NÃO FOR UM COMANDO OU TER VINDO DE OUTRO BOT    

    // Separa o comando dos argumentos
    const args = message.content
        .slice(prefixo.length)
        .replace(/\s{2,}/g, ' ')
        .split(' ');
    const commandName = args.shift().toLowerCase();


    if (!bot.commands.has(commandName)) return; // RETORNA SE O COMANDO NÃO EXISTE

    const command = bot.commands.get(commandName);

    try {
        command.execute(message, args);
    } catch (err) {
        console.log(err)
        message.reply('Oops, deu um erro aqui, me desculpa :(')
    };
})

bot.login(token); // PUT YOUR TOKEN HERE