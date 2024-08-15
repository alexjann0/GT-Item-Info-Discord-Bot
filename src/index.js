const { Client, IntentsBitField } = require('discord.js');
const ready = require('./events/ready/ready');
require('dotenv').config();

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

ready(client);

client.login(process.env.BOT_TOKEN);
