module.exports = {
    name: 'args',
    description: 'Comando de teste para verificar o retorno dos argumentos',
    execute(message, args) {
        if (!args.length) {
            return message.channel.send(`Nenhum argumento fornecido, ${message.author}!`);
        }

        console.log(args[0]);

        message.channel.send(`Comando: ${this.name}\nArgumentos: ${args}`);
    },
};