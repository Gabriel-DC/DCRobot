const { default: Axios } = require('axios');

module.exports = {
    name: 'draco',
    description: 'retorna o preço atual do DRACO',
    async execute(message, args) {
        // REVISAR DEPOIS
        try {
            const response = await Axios.post("https://api.mir4global.com/wallet/prices/draco/lastest", {});
            message.channel.send(`O valor do DRACO em DÓLARES é de: ${response.data.Data.USDDracoRate}`);

            await message.channel.send('Tá na mão fera', {
                files: [
                    "./draco.jpg"
                ]
            });
        } catch (error) {
            console.log(error);
            message.channel.send('Deu ruim fera, achei não');
        }
    },
};