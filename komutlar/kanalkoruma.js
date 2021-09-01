const db = require("quick.db");
const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args) => {
  if(message.author.id !== '848687787254743090') return message.channel.send('Bu Komuta Taç Lazım Canım.')
  if (!args[0]) {
    const embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Alliance Kanal Koruma")
      .setDescription(
        "Hatalı Kullanım Yaptın örnek: !kanal-koruma aç/kapat"
      );

    message.channel.send(embed);
    return;
  }
  let kanal = await db.fetch(`kanalk_${message.guild.id}`)
  if (args[0] == "aç") {
    if (kanal) {
      const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Alliance Kanal Koruma")
        .setDescription("Kanal Koruma Zaten Aktif Durumunda.");

      message.channel.send(embed);
      return;
    } else {
      db.set(`kanalk_${message.guild.id}`, "acik");
      const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Alliance Kanal Koruma")
        .setDescription("Kanal Koruma Açıldı.");

      message.channel.send(embed);
    }
  } else if (args[0] == "kapat") {
    db.delete(`kanalk_${message.guild.id}`);
    const embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Alliance Kanal Koruma")
      .setDescription("Kanal Koruma Kapandı.");

    message.channel.send(embed);
  }
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["kanal-k"],
};

exports.help = {
  name: "kanal-koruma",
  description: "kanal koruma",
  usage: "kanal-koruma"
};