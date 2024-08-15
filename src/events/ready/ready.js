const { REST, Routes, Collection, ActivityType, Events } = require("discord.js");
const { readdirSync } = require("fs");
const path = require('path');
require('dotenv').config();

module.exports = (client) => {
    client.on("ready", async () => {
        console.log("Successfully logged in!");
        console.log(`${client.user.tag} is online.`);
        client.user.setPresence({
            activities: [{ name: `Growtopia`, type: ActivityType.PLAYING }],
        });

        client.commands = new Collection();
        const commandsPath = path.join(__dirname, '..', '..', 'commands');
        console.log(commandsPath)
        const CommandFiles = readdirSync(commandsPath).filter(file => file.endsWith(".js"));

        const Commands = [];
        for (const file of CommandFiles) {
            const command = require(path.join(commandsPath, file));
            Commands.push(command.data.toJSON());
            client.commands.set(command.data.name, command);
        };

        const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN);
        try {
            console.log(`Refreshing Application (/) Commands`);

            await rest.put(Routes.applicationCommands(client.user.id), { body: Commands });

            console.log(`Slash Commands Succesfully Registered GLOBALLY!`);
        } catch (error) {
            console.error(error);
        };
    });

    client.on("interactionCreate", async interaction => {
        if (!interaction.isCommand()) return;
        
        const command = client.commands.get(interaction.commandName);
    
        if (!command) return;
    
        try {
            await command.run(client, interaction);
        } catch (err) {
            if (err) console.error(err);
        }
    });
    
    client.on(Events.InteractionCreate, async interaction => {
        
        if (interaction.isChatInputCommand()) {
            // command handling
        } else if (interaction.isAutocomplete()) {
            const command = interaction.client.commands.get(interaction.commandName);
    
            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }
    
            try {
                await command.autocomplete(interaction);
            } catch (error) {
                console.error(error);
            }
        }
    });
    

};
