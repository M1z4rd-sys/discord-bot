const db = require('quick.db')
const Discord = require('discord.js') 
exports.run = async (bot, message, args) => { 
    if (!args[0]) return message.channel.send('aç yada kapat yaz') 
    if (!message.member.hasPermission('ADMININSTAROR')) return message.channel.send('`SUNUCUYU_YÖNET` yetkisine sahip olmalısın!') 
    if (args[0] == 'aç') { 
        db.set(`kufur_${message.guild.id}`, 'acik')
             message.channel.send('Küfur Engel açıldı!') 
             } if (args[0] == 'kapat') { db.set(`kufur_${message.guild.id}`, 'kapali').then(i => {
                message.channel.send('Küfür Engel kapatıldı!') 
            }) 
        }  
    }
exports.conf = { enabled: true,
    guildOnly: false,
    aliases: ['küfür'],  
}; 
exports.help = {
    name: 'küfür-engelleme', 
    description: '[Admin Komutu]', 
    usage: 'küfür-engelleme' };