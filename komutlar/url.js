const Discord = require('discord.js');
const data = require('quick.db');

exports.run = async (client, message, args) => {
    let arg = ['aç', 'kapat'];
    if(!args[0]) return message.channel.send('Yanlış bir veri girdin sadece bunları kullanabilirsin: '+arg.join(', '));
    if(!arg.includes(args[0])) return message.channel.send('Sadece `aç` veya `kapat` yazabilirsin.');

    if(args[0] === 'aç') {
        const system = await data.fetch(`vanity.${message.guild.id}`);
        if(system) return message.channel.send('Görünüşe göre sistem zaten açık.');
        data.set(`vanity.${message.guild.id}`, true);
        message.channel.send('Sistem başarılı bir şekilde aktif hale getirildi.');
    };

    if(args[0] === 'kapat') {
        const system = await data.fetch(`vanity.${message.guild.id}`);
        if(!system) return message.channel.send('Görünüşe göre sistem zaten devre dışı.');
        data.delete(`vanity.${message.guild.id}`);
        message.channel.send('Sistem başarılı bir şekilde devre dışı hale getirildi.');
    };
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["vanity"],
}
exports.help = {
  name: 'vanity',
  description: 'Vanity url koruma sistemi',
  usage: 'vanity [aç/kapat]'
};