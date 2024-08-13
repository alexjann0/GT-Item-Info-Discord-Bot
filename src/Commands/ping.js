const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Show ping"),

    run: async (client, interaction) => {
        interaction.reply(`Pong! ${client.ws.ping} ms`)
    }
};
