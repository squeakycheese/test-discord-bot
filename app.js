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

    const userInputText = message.content.toLowerCase();

    if(message.author.bot) { return };
    console.log("a new message was written!");

    if (!message.author.bot) {
        message.reply("Hello world! You're not a bot!");
    }

    if (userInputText == "!commands" || userInputText == "!help") {
        message.reply("This bot operates on the following commands: !help !commands !age !math");
    } else if (userInputText == "!math") {
        message.reply("5 + 2 -1 * 5 / 2 - 4 + 7 * 3 % 5 = " + (5 + 2 -1 * 5 / 2 - 4 + 7 * 3 % 5));
    } else if (userInputText == "!age") {
        console.log(message.guild.createdTimestamp);
        console.log(message.guild.createdAt);
        console.log(new Date(message.guild.createdTimestamp).toString());
        message.reply("Server was created " + message.guild.createdAt.toString());
    }

    message.guild.members.fetch().then(
        (value) => {
            // console.log(value);
            value.forEach(user => {
                console.log(`${user.user.id} ${message.author.id}`);
                console.log(user.joinedTimestamp);
                let date = new Date(user.joinedTimestamp);
                message.reply(user.user.tag + " joined\n" + date.toString());
            })
        }, (error) => {
            console.log(error);
        }
    )
});

Client.login(token);