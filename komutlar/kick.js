const Discord = require('discord.js');
const {client , MessageEmbed } = require('discord.js');
const { prefix } = require('../ayarlar.json')

exports.run = (client, message, args) => {
  
  
    if (!message.member.hasPermission("KICK_MEMBERS")) {
        const bilgi = new MessageEmbed()
        .setDescription('Bu komutu kullanabilmek için **Kick** yetkisine sahip olmanız gerek.')
        .setColor("0000A0")
      return message.channel.send(bilgi).then(message.delete({timeout : 15000})) ;return
             }
  
    
    let user = message.mentions.users.first();
    let reason = args.slice(1).join(' ');
   
    if (message.mentions.users.size < 1) return message.reply('Atmak İstediğiniz Kişiyi Etiketleyiniz');
    if (reason.length < 1) return message.reply('Sebep Belirtin');
    if (user.id === message.author.id) return message.reply('Kendini Atamazsın');
  
  
    
  
    message.guild.members.cache.get(user.id).kick({days: 0, reason: reason})
    
    const narkozban = new MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`${user} **Başarıyla Atıldı**\nSebep : **${reason}**`)
    .setAuthor(`${message.author.tag} Tarafından Atıldı`, message.author.avatarURL)
    .setTimestamp()
    .setFooter('Alliance +')
    message.channel.send(narkozban)
      
  };

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['at'], 
};

exports.help = {
    name: 'kick', 
    description: 'kişiyi sunucudan atar', 
    usage: 'kick'
};
