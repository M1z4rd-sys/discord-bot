const chalk = require('chalk');
const moment = require('moment');
const figlet = require("figlet");
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;
var botconsole = ayarlar.botconsole

module.exports = client => {
  var oyun = [
          "DURUM BELİRLE /events/ready.js den ayarla beniii ⚡",
      ];
      var prefix = ayarlar.prefix;
  
      setInterval(function() {
  
          var random = Math.floor(Math.random()*(oyun.length-0+1)+0);
  
          client.user.setActivity(oyun[random], "https://www.instagram.com/" );
          }, 22500);
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Aktif, Komutlar yüklendi!`);
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: ${client.user.username} ismi ile giriş yapıldı!`);
    client.user.setStatus("online");
    client.user.setActivity(`${prefix}yardım + ${client.guilds.size} sunucu + ${client.users.size} kullanıcı`);
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Oyun ismi ayarlandı!`);
  };
