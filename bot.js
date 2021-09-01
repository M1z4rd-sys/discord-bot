const Discord = require('discord.js');
const client = new Discord.Client({ partials : ["MESSAGE", "REACTION", "CHANNEL"]});
const chalk = require("chalk");
const moment = require("moment");
const fs = require('fs');
const figlet = require("figlet");
const db = require("quick.db")
const ms = require('ms')
const { MessageEmbed } = require('discord.js')
const ayarlar = require('./ayarlar.json')
require('./util/eventLoader')(client);
const logkanal = ayarlar.guardlog
const güvenlix = ayarlar.güvenli
var prefix = ayarlar.prefix;

var botconsole = ayarlar.botconsole                
console.log(chalk.cyan(figlet.textSync(botconsole)));               
const log = message => {
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
  };

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});
client.reload = command => {
    return new Promise((resolve, reject) => {
      try {
        delete require.cache[require.resolve(`./komutlar/${command}`)];
        let cmd = require(`./komutlar/${command}`);
        client.commands.delete(command);
        client.aliases.forEach((cmd, alias) => {
          if (cmd === command) client.aliases.delete(alias);
        });
        client.commands.set(command, cmd);
        cmd.conf.aliases.forEach(alias => {
          client.aliases.set(alias, cmd.help.name);
        });
        resolve();
      } catch (e){
        reject(e);
      }
    });
  };
  
  client.load = command => {
    return new Promise((resolve, reject) => {
      try {
        let cmd = require(`./komutlar/${command}`);
        client.commands.set(command, cmd);
        cmd.conf.aliases.forEach(alias => {
          client.aliases.set(alias, cmd.help.name);
        });
        resolve();
      } catch (e){
        reject(e);
      }
    });
  };
  
  client.unload = command => {
    return new Promise((resolve, reject) => {
      try {
        delete require.cache[require.resolve(`./komutlar/${command}`)];
        let cmd = require(`./komutlar/${command}`);
        client.commands.delete(command);
        client.aliases.forEach((cmd, alias) => {
          if (cmd === command) client.aliases.delete(alias);
        });
        resolve();
      } catch (e){
        reject(e);
      }
    });
  };
  //reklam-koruma//
  client.on(`message`, async (message , guild) => {
    const bannedWords = [`discord.gg`, `https`, `http`, `.gg/`, `.gg /`, `. gg /`, `. gg/`, `discord .gg /`, `discord.gg /`, `discord .gg/`, `discord .gg`, `discord . gg`, `discord. gg`, `discord gg`, `discordgg`, `discord gg /`]
        if (bannedWords.some(word => message.content.toLowerCase().includes(word))) {
          let reklamkoruma = await db.fetch(`reklamk_${message.guild.id}`);
            if (reklamkoruma == "acik") {
              if (message.author.id === message.guild.owner.id) return;
              await message.delete();
              const embedr = new Discord.MessageEmbed()
              .setDescription("Reklam Yapmak Hırrım !")
              await message.channel.send(embedr);
        }
      
      }
  })
  //sa-as//
  client.on("message", async msg => {
    if(msg.channel.type == "dm") return;
  
    const i = await db.fetch(`ssaass_${msg.guild.id}`);
      if (i == 'acik') {
        if (msg.content.toLowerCase() == 'sa' || msg.content.toLowerCase() == 's.a' || msg.content.toLowerCase() == 'selamun aleyküm' || msg.content.toLowerCase() == 'selam' || msg.content.toLowerCase() == 'slm') {
            try {
  
                    return msg.reply('**Aleyküm Selam, Hoşgeldin**')
            } catch(err) {
              console.log(err);
            }
        }
      }
      else if (i == 'kapali') {
      
      }
      if (!i) return;
  
      });
      //Kanal koruma//
      client.on("channelDelete", async (channel) => {
        const logs = await channel.guild.fetchAuditLogs({ type: 'CHANNEL_DELETE' }).then(audit => audit.entries.first())
        let yapan = logs.executor;
        let kanalkoruma = await db.fetch(`kanalk_${channel.guild.id}`);
          if (kanalkoruma == "acik") {
            if(logs.executor.id === channel.guild.owner.id) return channel.guild.owner.send('Sana İşlemez')   
        channel.clone(undefined, true, true, "Alliance Kanal Koruma").then(async klon => {
          await klon.setParent(channel.parent);
          await klon.setPosition(channel.position);
          channel.guild.owner.send(`**${channel.name}** Adlı Kanal ${yapan} Adlı Kişi Tarafından Silindi Ve Ben O Kanalı Tekrar Oluşturdum`)
        })
        }
      })
      //Rol Koruma//
      client.on("roleDelete", async(role , channel , message , guild) => {
        const fetch = await role.guild.fetchAuditLogs({type: "ROLE_DELETE"}).then(log => log.entries.first())
        let yapan = fetch.executor;
        let rolkoruma = await db.fetch(`rolk_${role.guild.id}`);
          if (rolkoruma == "acik") {
            if(fetch.executor.id === role.guild.owner.id) return role.guild.owner.send('Rol Koruması Sana İşlemez')
       role.guild.roles.create({data: {name: role.name, color: role.color,  permissions: role.permissions}})
              role.guild.owner.send(` **${role.name}** Adlı Rol ${yapan} Kişi Tarafından Silindi Ve Ben Rolü Tekrar Oluşturdum  :white_check_mark:`)
        }
      })
  client.elevation = message => {
    if(!message.guild) {
      return; }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
  };
  //ddos-koruma//
  client.on('message', msg => {

    if(client.ping > 2000) {
    
                let bölgeler = ['singapore', 'eu-central', 'india', 'us-central', 'london',
                'eu-west', 'amsterdam', 'brazil', 'us-west', 'hongkong',
                'us-south', 'southafrica', 'us-east', 'sydney', 'frankfurt',
                'russia']
               let yenibölge = bölgeler[Math.floor(Math.random() * bölgeler.length)]
               let sChannel = msg.guild.channels.find(c => c.name === "ddos-system")
    
               sChannel.send(`Sunucuna DDOS Saldırısı Oluyor \nSunucunun Bölgesini Değiştirdim Kaldığınız Yerden Güvenle Devam Edebilirsiniz. \n __**${yenibölge}**__ :tik: __**Sunucu Pingimiz**__ :`+ client.ping)
               msg.guild.setRegion(yenibölge)
               .then(g => console.log(" bölge:" + g.region))
               .then(g => msg.channel.send("bölge **"+ g.region  + " olarak değişti"))
               .catch(console.error);
  }});
  ///AFK BÖLÜMÜ
client.on('message', async message => {
  if(message.author.bot) return;
  if(!message.guild) return;
  if(message.content.includes(`${prefix}afk`)) return;

  if(await db.fetch(`afk_${message.author.id}`)) {
    db.delete(`afk_${message.author.id}`);
    db.delete(`afk_süre_${message.author.id}`);
    message.reply('Başarıyla Afk Modundan Çıktınız.')
  }

  var user = message.mentions.users.first();
  if(!user) return;
  var reason = await db.fetch(`afk_${user.id}`);

  if(reason) {
    let süre = await db.fetch(`afk_süre_${user.id}`);
    let timeObj = ms(Date.now() - süre);
    const afkembd = new Discord.MessageEmbed()
    .setDescription(`${user}` + " Kullanıcısı Afk **Sebep: **"+ reason)
    message.channel.send(afkembd)
  }
  
})
  client.on('message', msg => {
    if (msg.content.toLowerCase() === 'nis') {
    msg.reply("İbonun'ki");
    }
    });
  client.on('message', msg => {
    if (msg.content.toLowerCase() === 'kadir') {
    msg.reply("Kadirmi Abi Diyceksin");
    }
    });
  //webhook-koruma//
  client.on("webhookUpdate", async (channel) => {
    let guild = channel.guild;
    guild.fetchAuditLogs().then(async (logs) => {
    if (logs.entries.first().action === `WEBHOOK_CREATE`) {
    let yetkili = logs.entries.first().executor;
    let id = logs.entries.first().executor.id;
    if (!güvenlix.includes(id)) {
    let users = guild.members.cache.get(id);
    let kullanic = guild.members.cache.get(client.user.id);
    users.kick()
    const webhook = new Discord.MessageEmbed()
    .setDescription(`${users} (\`${users.id}\`) Kullanıcısı İzinsiz Webhook İşlemi Yaptı.
    **__Kullanıcı Bilgisi__**
    \`Kullanıcı:\` ${users}
    \`ID:\` ${users.id}
    \`Tag:\` ${users.user.tag}
   
    **__Webhook Bilgisi__**
    \`Webhook Kanalı:\` #${channel.name}
 
    **${users.user.tag}** Kullanıcısını Kickledim.
    `)
    client.channels.cache.get(logkanal).send(webhook)
    }}})})
  //capslock engel//
  client.on("message", async msg => {
    if (msg.channel.type === "dm") return;
    if (msg.author.bot) return;
    if (msg.content.length > 1) {
      if (db.fetch(`capslock_${msg.guild.id}`)) {
        let caps = msg.content.toUpperCase();
        if (msg.content == caps) {
          if (!msg.member.permissions.has("ADMINISTRATOR")) {
            if (!msg.mentions.users.first()) {
              msg.delete();
              return msg.channel.send(`${msg.member}, Capslock Kapat Bro.`).then(nordx => nordx.delete({timeout: 5000}))
                
            }
          }
        }
      }
    }
  });
  //url koruma//
  client.on('guildUpdate', async (oldGuild, newGuild) => {
    if(newGuild.vanityURLCode !== oldGuild.vanityURLCode) {
        const system = await data.fetch(`vanity.${newGuild.id}`);
        if(!system) return;
        let fetch = await newGuild.fetchAuditLogs({type: 'GUILD_UPDATE'});
        let member = newGuild.members.cache.get(fetch.entries.first().executor.id);
        let user = member.user;
        if(user.bot == true) return;
        if(user.id === newGuild.owner.user.id) return;
        member.setRoles(["'"+member.roles.cache.filter(a => a.hasPermission('MANAGE_GUILD').map(a => a.id).join("', '"))+"'"]);
        member.send(`**${newGuild.name}** sunucusunun **Vanity Adres**ini değiştirdiğin için tüm yetkilerin alındı.`);
        guild.owner.user.send(`**${newGuild.name}** sunucundaki ${member}, sunucunun **Vanity Adres**ini değiştirmeyi denedi. Tüm yetkileri alındı.\n\n**•** ${oldGuild.vanityURLCode} -> ${newGuild.vanityURLCode}`);
    };
});
//otorol//
client.on('guildMemberAdd', member => {
  let sistem = db.fetch(`otorol_${member.guild.id}`)

  // Eğer Sistem Açıksa Kod Döndürelim CodeMareFi 
  if(sistem === 'acik'){
    const embed = new Discord.MessageEmbed()
    .setTitle("<a:tac:882291732799168583> Sunucumuza Hoşgeldin <a:tac:882291732799168583>")
    .setDescription(`<a:yanok:882220238551281684> Seninle Beraber **${member.guild.memberCount}** Kişi Olduk <a:redate:882291713400537129>\n<a:yanok:882220238551281684> Ses Kanallarına Geçerek Yetkilerimizin Gelmesini Bekleyin.<a:redate:882291713400537129>\n<a:yanok:882220238551281684> Tagımızı Alarak Bizlere Destek Olabilirsiniz.<a:redate:882291713400537129>\n @Register Hammer `)
    .setImage("https://www.icegif.com/wp-content/uploads/welcome-icegif-1.gif")
    .setThumbnail('https://media4.giphy.com/media/mgAgjH8JU55jq/200w.gif?cid=82a1493b7ek69loc62owa8bx19sibagy71ajrdypgn152q0t&rid=200w.gif&ct=g')
    .setTimestamp()
    // Data Veri Çekme İşlemi
    let rol = "880556032282222603"
    let kanal = "880518120496848896"

    // Rol Verme CodeMareFi 
    member.roles.add(rol)

    // Mesaj CodeMareFi 
    client.channels.cache.get(kanal).send(embed)
    
  } else if(sistem != "acik") {
    // Eğer Sistem Kapalıysa... CodeMareFi 
    return;
  }
})
  //küfür-engel//
  client.on("message", async (message) => { 
    let kufurengel = await db.fetch(`kufur_${message.guild.id}`);
      if (kufurengel == 'acik') { 
      const kufur = ["oç","Oç","göt","GÖT","Anskm","anskm","mk","Mk", "Amk", "ananı sikiyim", "ananısikim", "piç", "amk", "amınısikim", "sikim", "sikiyim", "orospu çoçuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "aq", "amcık", "amk", "yarram", "sikimi ye", "mk", "mq", "aw", "awq", "amq",]; 
      if (kufur.some(word => message.content.includes(word))) { 
        try { 
          if (!message.member.hasPermission("ADMINISTRATOR")) { 
            message.delete(); return message.reply('Küfür Yasak').then(message => message.delete({ timeout: 5000 })); } } 
            catch(err) { console.log(err); 
            } 
          } } else 
          if (kufurengel == 'kapali') { 

          } if (!kufurengel) return; }) 
  //antiraid koruma//
  client.on("guildMemberAdd", async (member) => {
    let botsec = await db.fetch(`botk_${member.guild.id}`);
    const fetch = await member.guild.fetchAuditLogs({type: "GUİLD_MEMBER_ADD"}).then(log => log.entries.first())
    let yapan = fetch.executor;
      if (botsec == "acik"){
      let sChannel = member.guild.channels.cache.find(channel => channel.name === "alliance-chat");
      if (member.user.bot !== true){  
      }else {
        sChannel
        
          .send(`Sunucuya Eklenen Bot = **${member.user.tag}**\nEkleyen Kişi ${yapan}\n Bot Banlanmıştır <a:1226_discord_verified:882220227549614080> `)
          .then(() => console.log(`yasaklandı ${member.displayName}`))
          .catch(console.error);
          member.ban(member);
      }
      }
  });
  var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
  // client.on('debug', e => {
  //   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
  // });
  
  client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
  });
  
  client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
  });

client.login(ayarlar.token);