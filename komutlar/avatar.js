const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const { prefix } = require('../ayarlar.json')

exports.run = async (client, message) => {
    let user = message.mentions.users.first() || message.author

    const embed = new MessageEmbed()
    .setImage(user.displayAvatarURL({dynamic : true, size: 4096}))
    .setColor('RED')
    .setTimestamp()
	.setFooter('Alliance');
    message.channel.send(embed)
};
    


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["pp","avatar"], 
    permLevel: 0
};

exports.help = {
    name: 'avatar', 
    description: 'profil resmini gösterir', 
    usage: ["pp","avatar"]
};
