const db = require("quick.db");
const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const { MessageEmbed } = require('discord.js');


exports.run = async (client, message, args, config) => {
if(message.author.id !== '848687787254743090') return message.channel.send('Bu Komuta Taç Lazım Canım.')
    if (!args[0]) {
        const embed = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setTitle("Alliance Reklam Koruma")
          .setDescription("**Hatalı kullanım! örnek: -reklam-engelle aç/kapat**");
    
        message.channel.send(embed);
        return;
      }
      let reklamkoruma = await db.fetch(`reklamk_${message.guild.id}`);
      if (args[0] == "aç") {
        if (reklamkoruma) {
          const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Alliance Reklam Koruma")
            .setDescription("**Reklam Koruma Zaten Aktif Durumunda.**");
          message.channel.send(embed);
          return;
        } else {
          db.set(`reklamk_${message.guild.id}`, "acik");
          const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Alliance Reklam Koruma")
            .setDescription("**Reklam Koruma Açıldı**");
    
          message.channel.send(embed);
        }
      } else if (args[0] == "kapat") {
        db.delete(`reklamk_${message.guild.id}`);
        const embed = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setTitle("Alliance Reklam Koruma")
          .setDescription("**Reklam Koruma Kapandı.**");
    
        message.channel.send(embed);
      }
    }

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['r-engel'], 
};

exports.help = {
    name: 'reklam-engel', 
    description: 'reklam engeli açar/kapar', 
    usage: 'reklam-engel'
};

