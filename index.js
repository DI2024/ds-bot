const { Client, GatewayIntentBits, Events } = require("discord.js");
const { joinVoiceChannel, entersState, VoiceConnectionStatus } = require("@discordjs/voice");

require('dotenv').config();
const TOKEN = process.env.TOKEN;
const GUILD_ID = "1430676062962057399";
const VOICE_CHANNEL_ID = "1452040337827561575";


const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

client.once(Events.ClientReady, async () => {
  console.log(`Logged in as ${client.user.tag}`);

  const guild = await client.guilds.fetch(GUILD_ID);
  const channel = guild.channels.cache.get(VOICE_CHANNEL_ID);

  if (!channel) {
    console.log("Voice channel not found.");
    return;
  }

  const connection = joinVoiceChannel({
    channelId: channel.id,
    guildId: guild.id,
    adapterCreator: guild.voiceAdapterCreator,
    selfMute: true,
    selfDeaf: false,
  });

  try {
    await entersState(connection, VoiceConnectionStatus.Ready, 30_000);
    console.log("Bot successfully connected to voice channel.");
  } catch (err) {
    console.error("Failed to connect to voice channel:", err);
  }
});

client.login(TOKEN);