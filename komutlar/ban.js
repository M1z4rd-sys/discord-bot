const Discord = require('discord.js');
const fs = require('fs');
const {client , MessageEmbed } = require('discord.js');
const { prefix } = require('../ayarlar.json')

exports.run = (client, message, args) => {
  
    
  if (!message.member.hasPermission("BAN_MEMBERS")) {
    const bilgi = new MessageEmbed()
    .setDescription('Bu komutu kullanabilmek için **Ban** yetkisine sahip olmanız gerek.')
    .setColor("RANDOM")
  return message.channel.send(bilgi).then(message.delete({timeout : 15000})) ;return
         }

  
  let user = message.mentions.users.first();
  let reason = args.slice(1).join(' ');
 
  if (message.mentions.users.size < 1) return message.reply('Banlamak İstediğin Kişiyi Etiketle');
  if (reason.length < 1) return message.reply('Sebep Belirtin');
  if (user.id === message.author.id) return message.reply('Kendini Banlayamazssın');


  

  message.guild.members.cache.get(user.id).ban({days: 0, reason: reason})
  
  const narkozban = new MessageEmbed()
  .setColor("RANDOM")
  .setDescription(`${user} **Başarıyla banlandı**\nSebep : **${reason}**`)
  .setAuthor(`${message.author.tag} Tarafından Banlandı`, message.author.avatarURL)
  .setTimestamp()
  .setFooter('Alliance +')
  message.channel.send(narkozban)
    
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['ban', 'yasakla'],
};

exports.help = {
  name: 'ban',
  description: 'İstediğiniz kişiyi sunucudan yasaklar.',
  usage: 'yasakla <@kullanıcı> <sebep>',
 
};