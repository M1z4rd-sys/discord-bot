const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const db = require("quick.db");

exports.run = async (client, message, args) =>{
    if(message.author.id !== '848687787254743090') return message.channel.send('Bu Komuta Taç Lazım Canım.')
    if (!args[0]) {
        const embed = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setTitle("Alliance Bot Koruma")
          .setDescription("Hatalı Kullanım Yaptın örnek: !bot-koruma aç/kapat");
        message.channel.send(embed);
        return;
      }
    let botsec = await db.fetch(`botk_${message.guild.id}`)
    if (args[0] == "aç") {
        if(botsec) {
        const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Alliance Bot Koruma")
        .setDescription("Bot Koruması Zaten Aktif Durumunda.");
        message.channel.send(embed);
        return;
        } else{
            db.set(`botk_${message.guild.id}`, "acik");
            const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Alliance Bot Koruma")
            .setDescription("Bot Koruma Açıldı.");
            message.channel.send(embed);
        }
    } else if (args[0] == "kapat"){
        db.delete(`botk_${message.guild.id}`);
        const embed = new Discord.MessageEmbed()
       .setColor("RANDOM")
       .setTitle("Alliance Bot Koruma")
       .setDescription("Bot Koruma Kapandı.");
        message.channel.send(embed);
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['bot-koruma'], 
};

exports.help = {
    name: 'bot-koruma', 
    description: 'bot-koruma', 
    usage: 'bot-koruma'
};

