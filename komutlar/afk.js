const Discord = require('discord.js');
const db = require('quick.db');
const { MessageEmbed } = require('discord.js');


exports.run = async (client, message, args)  => {
    var user = message.author;
    var reason = args.slice(0).join(" ");
    if(!reason) { const afksebep = new MessageEmbed()
    .setDescription('Lütfen Afk Olmak İçin Bir Sebep Giriniz.')
    return message.channel.send(afksebep).then(message.delete({timeout : 15000})) ;return
    }
    db.set(`afk_${user.id}`, reason);
    db.set(`afk_süre_${user.id}`, Date.now())
    message.channel.send("**Başaryıla Afk Moduna Girdiniz**")

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['afk'], 
    permLevel: 0
};

exports.help = {
    name: 'afk', 
    description: 'afk olduğunuzu belirtir', 
    usage: 'afk'
};