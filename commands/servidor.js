module.exports = {
    name: 'servidor',
    description: 'Retorna o nome do servidor com a quantidade total de membros',
    execute(message, args) {
        message.channel.send(`Nome do servidor: ${message.guild.name} \nTotal de membros: ${message.guild.memberCount}`); // Retorna características do server
    }
}