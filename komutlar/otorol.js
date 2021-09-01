const Disord = require('discord.js')
const db = require('quick.db')

exports.run = (client, message, args) => {
        if(args[0] === "aç"){
            // Ön Data CodeMareFi 
            db.set(`otorol_${message.guild.id}`, 'acik')

            // Let Tanımları CodeMareFi 
            let kanal = message.mentions.channels.first();
            let rol = message.mentions.roles.first();
            let mesaj = args.slice(3).join(' ')
    
            if(!kanal){
                const CodeMareFi = new Disord.MessageEmbed()
                .setDescription(`**Lütfen Bir Kanal Etiketle.**`)
                .setColor('RANDOM')
                return message.channel.send(CodeMareFi)
            }
            if(!rol){
                const CodeMareFi = new Disord.MessageEmbed()
                .setDescription(`**Lütfen Bir Rol Etiketle.**`)
                .setColor('RANDOM')
                return message.channel.send(CodeMareFi)
            }
            if(!mesaj){
                const CodeMareFi = new Disord.MessageEmbed()
                .setDescription(`**Lütfen Otorol Mesajı Giriniz Etiketle.**`)
                .setColor('RANDOM')
                return message.channel.send(CodeMareFi)
            }

            if(rol && kanal && mesaj){
                // Data CodeMareFi 
                db.set(`okanal_${message.guild.id}`, kanal.id)
                db.set(`orol_${message.guild.id}`, rol.id)
                db.set(`omesaj_${message.guild.id}`, mesaj)
    
                // Mesaj CodeMareFi 
                const CodeMareFi = new Disord.MessageEmbed()
                .setDescription(`
                Otorol Sistemi Başarıyla Aktif Edildi\n
                    \`Kanal\` = ${kanal}
                    \`Rol\` = ${rol}
                    \`Mesaj\` = **${mesaj}**
                `)
                .setColor('RANDOM')
                .setFooter('Alliance ')
                message.channel.send(CodeMareFi )
            }
        } else if(args[0] === "kapat"){
            // Kişi Eğer Sistemi Kapatırsa Datadaki Verileri Silelim CodeMareFi 
            db.delete(`orol_${message.guild.id}`)
            db.delete(`okanal_${message.guild.id}`)
            db.delete(`omesaj_${message.guild.id}`)           

            const CodeMareFi = new Disord.MessageEmbed()
            .setDescription(`**Otorol Sistemi Başarıyla Kapatıldı.**`)
            .setColor('RANDOM')
            .setFooter('Alliance ')
            message.channel.send(CodeMareFi)
        }
    }

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['otorol-ayarla'], 
};

exports.help = {
    name: 'otorol-ayarla', 
    description: 'otorol-ayarla', 
    usage: 'otorol-ayarla'
};