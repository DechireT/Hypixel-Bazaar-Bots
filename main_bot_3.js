//    set variables    \\
const Discord = require('discord.js');

const fs = require('fs');

const axios = require('axios').default;
const client = new Discord.Client();

const config = require('./config.json');
var stats = JSON.parse(fs.readFileSync('../stats.json'));

const invite_link = "https://discord.com/oauth2/authorize?client_id=852605107669041162&scope=bot%20applications.commands&permissions=2147765248";
const invite_link_1 = "https://discord.com/oauth2/authorize?client_id=851495184075063336&scope=bot%20applications.commands&permissions=2147765248";
const invite_link_2 = "https://discord.com/oauth2/authorize?client_id=852604418095579169&scope=bot%20applications.commands&permissions=2147765248";

const CommandSize = 74;

//      On enable       \\
client.once('ready', async () => {
    console.log('The bot is Online !');

    // Set the bot presence \\
    client.user.setPresence({
        status: 'online',
        activity: {
            name: '/help',
            type: 'WATCHING', //PLAYING, WATCHING, LISTENING, or STREAMING
        }
    });

    var item = "young_fragment";

    client.api.applications(client.user.id).commands.post({ //Post a command
        
        data: {
            //name: item,
            //description: "Get " + item.replace('_', ' ').replace('_', ' ').replace('_', ' ').replace('_', ' ') + " information about the Hypixel Skyblock Bazaar"
            
            //name: "help",
            //description: "Help command"

            name: "invite",
            description: "Invite the bot"
        }
    });
    //console.log(await client.api.applications(client.user.id).commands.get()); //Get all slash command data
    //client.api.applications(client.user.id).commands('851496594418827315').delete(); //Delete a command*/

});

client.on('message', async message => {
    // debug command \\
    if(message.content.startsWith('!debug')) {

    }
})



//       Command request        \\
client.ws.on('INTERACTION_CREATE', async interaction => {
    //console.log(interaction);

    if(interaction.data.custom_id == null) {
        const command = interaction.data.name.toLowerCase();

        const args = interaction.data.options;

        const sender = interaction.member.user;

        //sender.username;
        //sender.discriminator;
        //sender.id;
        //sender.avatar; -> 156d3afd92cf5bd8770e3e28aee607be

        const guild = client.guilds.fetch(interaction.guild_id);

        const channel = interaction.channel_id;

        

        if(command.startsWith('help')) {
            const commands = await client.api.applications(client.user.id).commands.get();
            const emblem = new Discord.MessageEmbed();
            const emblem2 = new Discord.MessageEmbed();
            const emblem3 = new Discord.MessageEmbed();
            const emblem4 = new Discord.MessageEmbed();
            emblem.setTitle('**Help :**');
            emblem.setColor('#ffff00');
            emblem.setDescription(
                "**Commands :**\n"
            );
            for (let i = 0; i < 25; i++) {
                emblem.addField('**/' + commands[i].name + '**', commands[i].description + '\n')
            }
            for (let i = 25; i < 50; i++) {
                emblem2.addField('**/' + commands[i].name + '**', commands[i].description + '\n')
            }
            for (let i = 50; i < CommandSize; i++) {
                emblem3.addField('**/' + commands[i].name + '**', commands[i].description + '\n')
            }
            
            emblem2.setColor('#ffff00');
            emblem3.setColor('#ffff00');     
            emblem3.setTimestamp();
            emblem3.setFooter("By DechireT#0674");
            sendApi(interaction, emblem);
            const channel = client.channels.cache.get(interaction.channel_id);
            channel.send(emblem2);
            channel.send(emblem3);
            update_guild_user();
        } else if(command.startsWith('invite')) {
            const emblem = new Discord.MessageEmbed();
            emblem.setTitle('**Invitation**');
            emblem.setURL(invite_link);
            emblem.setTimestamp();
            emblem.setDescription(
                'Thanks for using ' + client.user.username + ' 👍 ! \n'
                + 'Do you want to invite me on an other discord server ? 🤔\n'
                + '✅ YES !!! Thank you so much 😍\n'
                + '\n'
                + '📡 invite link 👉 : ' + invite_link + '\n'
                + '\n'
                + 'But do not forget his family 👨‍👨‍👦\n'
                + client.user.username.replace(' 3', '') + ' 1 👉 : ' + invite_link_1 + '\n'
                + client.user.username.replace(' 3', '') + ' 2 👉 : ' + invite_link_2 + '\n'               
            );
            emblem.setFooter("By DechireT#0674");
            emblem.setColor('#ffff00');
            sendApi(interaction, emblem);
            update_guild_user();
        } else if(command.startsWith('stats')) {
            stats = JSON.parse(fs.readFileSync('../stats.json'));
            const emblem = new Discord.MessageEmbed();
            emblem.setTitle('**Stats :**');
            emblem.setTimestamp();
            emblem.setDescription(
                '**Requests :**\n'
                + 'Global requests : `' + stats.requests.global_requests + '`\n'
                + 'Requests Bot 1 : `' + stats.requests.request_bot_1 + '`\n'
                + 'Requests Bot 2 : `' + stats.requests.request_bot_2 + '`\n'
                + 'Requests Bot 3 : `' + stats.requests.request_bot_3 + '`\n'
                + '\n'
                + '**Guilds count :**\n'
                + 'Guilds bot 1 : `' + stats.guilds.guild_bot_1 + '`\n'
                + 'Guilds bot 2 : `' + stats.guilds.guild_bot_2 + '`\n'
                + 'Guilds bot 3 : `' + stats.guilds.guild_bot_3 + '`\n'
                + '\n'
                + '**Users count :**\n'
                + 'Users bot 1 : `' + stats.users.user_bot_1 + '`\n'
                + 'Users bot 2 : `' + stats.users.user_bot_2 + '`\n'
                + 'Users bot 3 : `' + stats.users.user_bot_3 + '`\n'
            );
            emblem.setFooter("By DechireT#0674");
            emblem.setColor('#ffff00');
            sendApi(interaction, emblem);
            update_guild_user();
        } else {
            getBazaar(interaction);
            update();
        }
}
});


async function getBazaar(interaction) {

    const emblem = new Discord.MessageEmbed();

    let command = "";
    command = interaction.data.name
    command = command.replace( 'dark_oak_wood', 'log_2:1').replace('acacia_wood', 'log_2').replace('spruce_wood', 'log:1').replace('birch_wood', 'log:2')
                    .replace('jungle_wood' ,'log:3').replace('oak_wood', 'log').replace('enchanted_brown_mushroom_block', 'enchanted_huge_mushroom_1')
                    .replace('enchanted_red_mushroom_block', 'enchanted_huge_mushroom_2').replace('raw_salmon', 'raw_fish:1').replace('clownfish', 'raw_fish:2')
                    .replace('pufferfish', 'raw_fish:3').replace('red_mushroom_block', 'huge_mushroom_2').replace('brown_mushroom_block', 'huge_mushroom_1')
                    .toUpperCase();

    axios.get("https://api.hypixel.net/skyblock/bazaar").then(function (json) {
    json = json.data;
    
    //console.log(json.data);
    if(json.success == true) {
        emblem.setTitle('Hypixel Bazaar Products');
        emblem.setTimestamp();
        
        //console.log(json.data.products[command]);
        emblem.setDescription(
            getProduct(json.products[command])
        )
        
        emblem.setColor('#00ff00');
        emblem.setFooter('By DechireT#0674');
    } else if(json.success == false){
        emblem.setTitle('**Error**');
        emblem.setDescription('❌ Error: ' + json.error);
        emblem.setTimestamp();
        emblem.setColor('#ff0000');
    } else {
        emblem.setTitle('**Error**');
        emblem.setDescription('❌ Error: The connection was failed ! 📡');
        emblem.setTimestamp();
        emblem.setColor('#ff0000');
        emblem.setFooter('By DechireT#0674');
    }

    })
    .catch(function (error) {
        console.log('ERROR : ' + error);
        emblem.setTitle('**Error**');
        emblem.setDescription('❌ ' + error);
        emblem.setTimestamp();
        emblem.setColor('#ff0000');
        emblem.setFooter('By DechireT#0674');
    })
    .then(function () {
        sendApi(interaction, emblem);
        return;
    });
}

function getProduct(json) {
    var name = json.product_id.toLowerCase().replace('log_2:1', 'dark_oak_wood').replace('log_2', 'acacia_wood').replace('log:1', 'spruce_wood').replace('log:2', 'birch_wood')
    .replace('log:3', 'jungle_wood' ).replace('log', 'oak_wood').replace('enchanted_huge_mushroom_1', 'enchanted_brown_mushroom_block')
    .replace('enchanted_huge_mushroom_2', 'enchanted_red_mushroom_block').replace('raw_fish:1', 'raw_salmon').replace('raw_fish:2', 'clownfish')
    .replace('raw_fish:3', 'pufferfish').replace('huge_mushroom_2', 'red_mushroom_block').replace('huge_mushroom_1', 'brown_mushroom_block')
    .replace('_', ' ').replace('_', ' ').toUpperCase();

    //console.log(json)
    const sell_offer_min = getSell_offer_min(json);
    const sell_offer_max = json.sell_summary[0] != null ? json.sell_summary[0].pricePerUnit : "❌";
    const buy_order_min = json.buy_summary[0] != null ? json.buy_summary[0].pricePerUnit : "❌";
    const buy_order_max = getBuy_Order_max(json);

    var sell_instantly = 0;
    var buy_instantly = 0;

    sell_instantly = json.quick_status.sellPrice;
    buy_instantly = json.quick_status.buyPrice;

    sell_instantly = sell_instantly.toFixed(2);
    buy_instantly = buy_instantly.toFixed(2);

    return "\n   " 
    + "**" + name + " :**\n"
    + "Sell Offer : `" + sell_offer_min + "` - `" + sell_offer_max + "`\n"
    + "Buy Order : `" + buy_order_min + "` - `" + buy_order_max + "`\n"
    + "\n"
    + "Sell Instantly : `" + sell_instantly + "`\n"
    + "Sell Volume : `" + json.quick_status.sellVolume + "`\n"
    + "Sell Moving Week : `" + json.quick_status.sellMovingWeek + "`\n"
    + "\n"
    + "Buy Instantly : `" + buy_instantly + "`\n"
    + "Buy Volume : `" + json.quick_status.buyVolume + "`\n"
    + "Buy Moving Week : `" + json.quick_status.buyMovingWeek + "`\n"
    + "\n"
    ;
}


// Update user/guild bot's stats   \\
function update_guild_user() {
    stats = JSON.parse(fs.readFileSync('../stats.json'));
    stats.guilds.guild_bot_3 = client.guilds.cache.size;
    stats.users.user_bot_3 = client.users.cache.size;
    saveStatsFile();
}

// Update all bot's stats  \\
function update() {
    stats = JSON.parse(fs.readFileSync('../stats.json'));
    stats.guilds.guild_bot_3 = client.guilds.cache.size;
    stats.requests.global_requests = stats.requests.global_requests + 1;
    stats.requests.request_bot_3 = stats.requests.request_bot_3 + 1;
    stats.users.user_bot_3 = client.users.cache.size;
    saveStatsFile();
}

// Save the stats file \\
function saveStatsFile() {
    fs.writeFile('../stats.json', JSON.stringify(stats), (err) => {
        if(err) console.log(err);
    })
}

function getBuy_Order_max(json) {

    for (let i = 29; i > -1; i--) {
        if(i != -1 && json.buy_summary[i] != null) {
            if(json.buy_summary[i].pricePerUnit != 0) {
                return json.buy_summary[i].pricePerUnit;
            }else {
                return "❌";
            }         
        } else if(i == -1) {
            return "❌";
        }
    }
    return "❌";
}

function getSell_offer_min(json) {

    for (let i = 29; i > -1; i--) {
        if(i != -1 && json.sell_summary[i] != null) {
            if(json.sell_summary[i].pricePerUnit != 0) {
                return json.sell_summary[i].pricePerUnit;
            }else {
                return "❌";
            }         
        } else if(i == -1) {
            return "❌";
        }
    }
    return "❌";
}

// Simple function for send an api message \\
async function sendApi(interaction, content) {
    client.api.interactions(interaction.id, interaction.token).callback.post({ //Post a response for your slash command
        data: {
            type: 4,
            data: await createAPIMessage(interaction, content)
        }
    });
}

// Simple function for create an api message \\
async function createAPIMessage(interaction, content) {
    const apiMessage = await Discord.APIMessage.create(client.channels.resolve(interaction.channel_id), content)
        .resolveData()
        .resolveFiles();
    
    return { ...apiMessage.data, files: apiMessage.files };
}

//    Login the bot   \\
client.login(config.password);