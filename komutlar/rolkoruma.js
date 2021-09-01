const db = require('quick.db')
const Discord = require('discord.js')
const ayarlar = require("../ayarlar.json");
const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args, config) => {
  if(message.author.id !== '848687787254743090') return message.channel.send('Bu Komuta Taç Lazım Canım.')
        if (!args[0]) {
          const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Alliance Rol Koruma ")
            .setDescription("**Hatalı kullanım! örnek: !rol-koruma aç/kapat**");
      
          message.channel.send(embed);
          return;
        }
        let rol = await db.fetch(`rolk_${message.guild.id}`);
        if (args[0] == "aç") {
          if (rol) {
            const embed = new Discord.MessageEmbed()
              .setColor("RANDOM")
              .setTitle("Alliance Rol Koruma")
              .setDescription("**Rol Koruma Sistemi Zaten Aktif !!**");
      
            message.channel.send(embed);
            return;
          } else {
            db.set(`rolk_${message.guild.id}`, "acik");
            const embed = new Discord.MessageEmbed()
              .setColor("RANDOM")
              .setTitle("Alliance Rol Koruma")
              .setDescription("**Rol Koruma Sistemi Aktif Halde... Silinen Rolleri Tekrar Açacağım Ve Size Bildiriceğim !**");
      
            message.channel.send(embed);
          }
        } else if (args[0] == "kapat") {
          db.delete(`rolk_${message.guild.id}`);
          const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Alliance Rol Koruma")
            .setDescription("**Rol Koruma Sistemi Kapatıldı !**");
      
          message.channel.send(embed);
        }

    }
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["rol-k"],
  permLevel: 0,
};

exports.help = {
  name: "rol-koruma",
  description: "Rol koruma",
  usage: "rol-koruma"
};