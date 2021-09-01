const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json')
const {client , MessageEmbed } = require('discord.js');
const { prefix } = require('../ayarlar.json')
Math.random('discord.js');


exports.run = async (client, message, Discord, args) => {
    var randomSayi = ["büyük","küçük"]

    var random = randomSayi[Math.floor(Math.random(1) * randomSayi.length)]

    var pipicmm = ayarlar.pipicm[Math.floor(Math.random(1)*ayarlar.pipicm.length)]

    const kaccm = new MessageEmbed()
        .addField('Pipi Santimin..', `${pipicmm}`)
    var Msg = await message.channel.send(kaccm)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['kaçcm'], 
    permLevel: 0
};

exports.help = {
    name: 'kaçcm', 
    description: 'kaçcm olduğunu söyler', 
    usage: 'kaçcm'
};
