const Discord = require('discord.js');

 exports.run = (client, message, args) => {
     if(message.channel.type == "dm")  return;
  if(message.channel.type !== "text") return;
  if (!message.member.hasPermission("ADMINISTRATOR")) {
    const bilgi = new Discord.MessageEmbed()
    .setDescription('Bu komutu kullanabilmek için **Admin** yetkisine sahip olmanız gerek.')
    .setColor("0000A0")
  return message.channel.send(bilgi).then(message.delete({timeout : 15000})) ;return
         }
       if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`Bu komutu kullanabilmek için **Mesajları Yönet** iznine sahip olmalısın!`).then(m => m.delete({timeout : 15000}));

   message.delete({timeout : 15000});

   let question = args.join(' ');

   let user = message.author.username

   if (!question) return message.channel.send(

     new Discord.MessageEmbed()

     .addField(`Alliance Oylama :x:`,'Oylama Yapmak İçin Yazı Yazmanız Gerek')).then(m => m.delete({timeout : 15000}));

     message.channel.send(

       new Discord.MessageEmbed()

       .setColor("RANDOM")
       .setThumbnail(client.user.avatarURL)
       .setTimestamp()
       .setFooter('Bot', client.user.avatarURL)

       .addField(`**Oylama**`, `**${question}**`)).then(function(message) {

         message.react('✅');

         message.react('❌');

       });

     };

 exports.conf = {
   enabled: true,
   guildOnly: false,
   aliases: ['oylama'],
   permLevel: 0

};

exports.help = {
  name: 'oylama',
  description: 'Oylama yapmanızı sağlar.',
  usage: 'oylama [oylamaismi]'
};