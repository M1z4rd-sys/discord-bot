const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    const bilgi = new MessageEmbed()
    .setDescription('Bu komutu kullanabilmek için **Mesajları Yönet** yetkisine sahip olmanız gerek.')
    .setColor("0000A0")
  return message.channel.send(bilgi).then(message.delete({timeout : 15000})) ;return
         }

  let silMiktar;
  
  if(isNaN(args[0]) || parseInt(args[0]) <= 0) return message.channel.send("Lütfen Bir Sayı Giriniz")
  
  if(parseInt(args[0]) > 100){
    message.channel.send("En fazla 100 mesaj silebilirsiniz.")
  }
  else{
    silMiktar = parseInt(args[0])
  }
  
  message.channel.bulkDelete( silMiktar + 1, true)
  message.reply(`**${silMiktar} mesaj başarıyla silindi**`).then(msg => msg.delete({timeout:5000}))
        
  };
  
  exports.conf = {
    enabled: true,
    aliases: ['delete'],
    permLevel: 0,
  };
  
  exports.help = {
    name: "sil",
    description: "mesajı siler",
    usage: "sil",
  };