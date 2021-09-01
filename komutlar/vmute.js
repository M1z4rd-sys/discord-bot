const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js');
const ms = require('ms')

exports.run = (client, message, args) => {
        if (!message.member.hasPermission("MUTE_MEMBERS")) {
            const bilgi = new MessageEmbed()
            .setDescription('Bu komutu kullanabilmek için **Mute** yetkisine sahip olmanız gerek.')
            .setColor("0000A0")
          return message.channel.send(bilgi).then(message.delete({timeout : 15000})) ;return
                 }

        // Let tanımları
        let kullanıcı = message.mentions.members.first();
        let sure = args[1];
        let sebep = args.slice(2).join(' ')

        // Hata mesajları
        if(!kullanıcı){
            const cmfhata = new Discord.MessageEmbed()
            .setDescription(`${message.author} - **Lütfen Kullanıcı Etiketle.**`)
            .setColor('RANDOM')
            return message.channel.send(cmfhata)
        }
        if(!kullanıcı.voice.channel){
            const cmfhata = new Discord.MessageEmbed()
            .setDescription(`${message.author} - **Etiketlediğin Kullanıcı Ses Kanalında Değil.**`)
            .setColor('RANDOM')
            return message.channel.send(cmfhata)
        }
        if(!sure){
            const cmfhata = new Discord.MessageEmbed()
            .setDescription(`${message.author} - **Lütfen Süre Gir.**`)
            .setColor('RANDOM')
            return message.channel.send(cmfhata)
        }
        if(!sebep){
            const cmfhata = new Discord.MessageEmbed()
            .setDescription(`${message.author} - **Sebep Girmeyi Unutma !**`)
            .setColor('RANDOM')
            return message.channel.send(cmfhata)
        }

        // CodeMareFi Süreli Mute.
        if(kullanıcı && sure && sebep){
            const cmfmute = new Discord.MessageEmbed()
            .setDescription(`
                ${kullanıcı}(\`${kullanıcı.id}\`) Kişisi ${message.author} Tarafından Seste Mutelendi.\n **${sebep}** Sebebiyle **${sure.replace(/s/, ' Saniye').replace(/m/, ' Dakika').replace(/h/, ' Saat').replace(/d/, ' Gün')}** Boyunca.
            `)
            .setColor('RANDOM')
            message.channel.send(cmfmute)

            // Burda Mute Atacak
            kullanıcı.voice.setMute(true)

            // Verdiğimiz Süre Doluncada Mute Kalkacak
            setTimeout(() => {
                kullanıcı.voice.setMute(false)

                const cmfmute2 = new Discord.MessageEmbed()
                .setDescription(`${kullanıcı}(\`${kullanıcı.id}\`) Adlı Kullanıcının Ses Mutesi Kalktı.`)
                .setColor('RANDOM')
                return message.channel.send(cmfmute2)

            }, ms(sure))
        }
    }

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['SES-MUTE','smute'],
    permLevel: 0
}

exports.help = {
    name: "ses-mute",
    description: "mute atar",
    usage: ['SES-MUTE','smute'],
}