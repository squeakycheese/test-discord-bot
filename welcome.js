const Discord = require("discord.js");
const { token } = require("./config.json");
const Client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.GuildMembers,
        Discord.GatewayIntentBits.DirectMessages,
        Discord.GatewayIntentBits.MessageContent,
        Discord.GatewayIntentBits.Guilds
    ], partials: [
        Discord.Partials.Message,
        Discord.Partials.Channel,
        Discord.Partials.GuildMember,
        Discord.Partials.User,
        Discord.Partials.GuildScheduledEvent
    ]
});

Client.on("ready", (client) => {
    console.log("This bot is now online: " + client.user.tag)
});

Client.on("messageCreate", (message) => {

    if(message.author.bot) { return };
    console.log("Hello There!");

});

Client.on("guildMemberAdd", (guildMember) => {

    // guildMember.guild.channels.fetch().then(channels => console.log(channels)).catch(console.error);

    guildMember.send("Wellcome to the server!");

    guildMember.guild.channels.fetch("1119223176732348438")
        .then(channel => channel.send("Welcome to the server! <@" + guildMember.id + ">"))
        .catch(console.error);

    guildMember.guild.channels.fetch("1159874818926186608")
        .then(channel => channel.send(guildMember.user.tag + " joined the server. Date & Time: " + new Date(guildMember.joinedTimestamp)))
        .catch(console.error);
});

Client.login(token);