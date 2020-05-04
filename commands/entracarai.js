module.exports = {
    name: 'entracarai',
    description: 'Entra no canal de voz do membro que o invocou',
    async execute(message, args) {
        if (message.member.voice.channel) { // Verifica se quem chamou está em um canal de voz
            await message.member.voice.channel.join(); // conecta no canal de voz
            console.log('entrei'); // debug only
        } else {
            message.reply('Entra em um canal de voz primeiro carai');
        }
    },
};