const Discord = require("discord.js");


exports.run = async (client, message, args) => {
    
    if(!message.member.voice.channel) return message.channel.send("Ses Kanalında Olmanız Gerek.").then(msg => msg.delete({timeout: 5000}));
    let kullanıcı = message.mentions.members.first();
  if (!kullanıcı) return message.channel.send("Kullanıcıyı etiketlemelisin !").then(msg => msg.delete({timeout: 5000}));
  if (!kullanıcı.voice.channel) return message.channel.send("Etiketlenen kullanıcı bir ses kanalında değil.").then(msg => msg.delete({timeout: 5000}));

  let embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(`${message.guild.name} - Git`, message.guild.iconURL)
  .setFooter(`Komutu Kullanan: ${message.author.tag}`, message.author.avatarURL)
  .setTimestamp()
embed.setDescription(`${kullanıcı}, ${message.author} adlı kullanıcı yanına gelmek istiyor.\n**İzin Veriyormusun ?**`)
message.channel.send(embed).then(async msg => {
    await msg.react('➡');
    msg.react('❌');
    const ileriFiltre = (reaction, user) => reaction.emoji.name === '<a:rozet:882220243399893083>' && user.id === kullanıcı.id;		 
    const iptalFiltre = (reaction, user) => reaction.emoji.name === '❌' && user.id === kullanıcı.id;
    const ileri = msg.createReactionCollector(ileriFiltre, {timer: 6000});
    const iptal = msg.createReactionCollector(iptalFiltre, {timer: 6000});

    ileri.on('collect', r => {
        if (!message.member.voice.channel) return;
        msg.reactions.removeAll();
        message.member.voice.setChannel(kullanıcı.voice.channel)
        embed.setDescription(`**<@${message.author.id}>, isteğin kabul edildi !**`)
        msg.edit(embed)
    });
    iptal.on('collect', r => {
        msg.reactions.removeAll();
        embed.setDescription(`**<@${message.author.id}>, istegin reddedildi !**`)
        msg.edit(embed)
      });
    });
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['git'],
};

exports.help = {
    name: 'git',
    description: 'İstediğiniz kişiniyi yanına gider',
    usage: 'git'
};