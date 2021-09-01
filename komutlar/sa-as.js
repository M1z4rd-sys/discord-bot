const db = require('quick.db')
const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js');


exports.run = async (bot, message, args) => {
  if(message.author.id !== '848687787254743090') return message.channel.send('Bu Komuta Taç Lazım Canım.')
  if (!args[0]) return message.channel.send(`Aç yada kapat yazmalısın!! Örnek:  ".sa-as aç"`)

  if (args[0] == 'aç') {
    db.set(`ssaass_${message.guild.id}`, 'acik')
    const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Alliance Sa-As sistemi!")
        .setDescription("**Sa-As Komutu Açıldı Biri Selam Verdiğinde Komut Çalışıcak**");

      message.channel.send(embed);
  }
  if (args[0] == 'kapat') {
    db.set(`ssaass_${message.guild.id}`, 'kapali')
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("Alliance Sa-As sistemi!")
    .setDescription("**Artık Biri Sa Diyince Selam Vermiycek :(**");

  message.channel.send(embed);
    
  }

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['sa-as-sistemi'],
  permLevel: 0
};

exports.help = {
  name: 'sa-as',
  description: 'saasayarla.',
  usage: 'sa-as'
};