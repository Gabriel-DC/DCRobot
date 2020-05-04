module.exports = {
    name: 'vaza',
    description: 'Retira o bot do canal de áudio',
    execute(message, args) {
        if (message.member.voice.channel === null) { // Verifica se quem chamou está em um canal de voz, se não estiver retorna uma mensagem
            message.reply('Ta doidão? vazar da onde ?!');
        } else {
            message.member.voice.channel.leave(); // Sai do canal de voz
        }
    }
}