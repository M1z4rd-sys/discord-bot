const Discord = require('discord.js');
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {

  if (!message.member.permissions.has("ADMININSTAROR")) return message.channel.send(`❌ Bu Komutu Kullana Bilmek İçin \`Admin\` Yetkisine Sahip Olmalısın.`)

      const prefix = db.fetch(`prefix.${message.guild.id}`) || "-"
   if (!args[0]) {
 message.channel.send(`**Örnek Kullanım:** ${prefix}capslock-engel aç/kapat`)
  }

  if(args[0] === 'aç') {
    db.set(`capslock_${message.guild.id}`, true)
    message.channel.send(`Capslock Engel Sistemi Aktif`)
  return
}

if (args[0] === 'kapat') {
  db.delete(`capslock_${message.guild.id}`)
message.channel.send(`Capslock Engel Sistemi Devre Dışı`)
return
}

  
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['capsengel'],
};
exports.help = {
  name: 'capslock-engel',
  description: 'capsengel',
  usage: 'capsengel'
};