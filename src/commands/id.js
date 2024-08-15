const { SlashCommandBuilder,EmbedBuilder } = require("@discordjs/builders");
const itemsData = require('../../files/items.json');
const itemNames = itemsData.items.map(item => item.name);

module.exports = {
    data: new SlashCommandBuilder()
        .setName("id")
        .setDescription("Search for the item id of an item")
        .addStringOption(option =>
            option.setName('name')
                .setDescription('The name of the item')
                .setRequired(true)
                .setAutocomplete(true)),
    
                async autocomplete(interaction) {
                    const input = interaction.options.getString('name');
                    const filteredChoices = itemNames.filter(name => name.toLowerCase().includes(input.toLowerCase())).slice(0, 25);
            
                    await interaction.respond(
                        filteredChoices.map(name => ({ name: name, value: name })),
                    );
                },

    run: async (client, interaction) => {
        const searchedItem = interaction.options.getString('name');
        
        if (!searchedItem) {
            return interaction.reply('Please select an item name.');
        }

        const item = itemsData.items.find(item => item.name.toLowerCase() === searchedItem.toLowerCase());

        if (!item) {
            return interaction.reply('Invalid item name. Please choose from the available options.');
        }

        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(`🔎 Searched for: ${item.name}`)
            .addFields(
                { name: 'Name', value: `${item.name}` },
                { name: 'Item ID', value: `${item.itemID}` },
            )

        interaction.reply({ embeds: [embed] });
    }
};
