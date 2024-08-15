const { SlashCommandBuilder,EmbedBuilder } = require("@discordjs/builders");
const itemsData = require('../../files/items.json');
const itemNames = itemsData.items.map(item => item.name);

module.exports = {
    data: new SlashCommandBuilder()
        .setName("name")
        .setDescription("Search for the name of an item using item id")
        .addIntegerOption(option =>
            option.setName('id')
                .setDescription('The item id of the item')
                .setRequired(true)
        ),

    run: async (client, interaction) => {
        const searchedItem = interaction.options.getInteger('id');
        
        if (!searchedItem) {
            return interaction.reply('Please input item id');
        }

        const item = itemsData.items.find(item => item.itemID === searchedItem);

        if (!item) {
            return interaction.reply('Invalid item id');
        }

        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(`🔎 Searched for: ${item.itemID}`)
            .addFields(
                { name: 'Name', value: `${item.name}` },
                { name: 'Item ID', value: `${item.itemID}` },
            )

        interaction.reply({ embeds: [embed] });
    }
};
