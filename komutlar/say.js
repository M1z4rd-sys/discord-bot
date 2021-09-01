const Discord = require("discord.js")
const { MessageEmbed } = require('discord.js');
module.exports.run = async (client, message, args) => {
  var tagdakiler = 0;
  let tag = "₹";
  message.guild.members.cache.forEach(member => {
    if(member.user.username.includes(tag)) {
      tagdakiler = tagdakiler+1
    }
  })
 
  const voiceChannels = message.guild.channels.cache.filter(c => c.type === 'voice');
    let count = 0;
   
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
  const avezyembed = new Discord.MessageEmbed()
  .setThumbnail(client.user.avatarURL)
  .setColor("RANDOM")
  .setTitle("<a:rozet:882220243399893083> Alliance Sunucu Bilgileri <a:rozet:882220243399893083>")
  .addField(`<a:yanok:882220238551281684> **Ses Kanallarında Bulunan Kişi Sayısı**`, `**${count}** Kişi Bulunmaktadır.`)  // emoji yazan yerlere yazdıgınız emoji gelecektir.
  .addField(`<a:yanok:882220238551281684>  **Sunucuda Bulunan Kişi Sayısı** `,`**${message.guild.memberCount}** Kişi Bulunmaktadır.`)
  .addField(`<a:yanok:882220238551281684>  **Taglı Üye Sayısı**`,` **${tagdakiler}**` +  ` Kişi Tagımızda!`)
  .setFooter(`Alliance +`)
  message.channel.send(avezyembed)

}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['say'],
};

exports.help = {
  name: 'say',
  description: ' Sunucudaki ve sesdeki üyeleri gösterir',
  usage: 'say'
};;