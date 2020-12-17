const Discord = require("discord.js");
require("events").EventEmitter.defaultMaxListeners = 30000;
  require("events").defaultMaxListeners = 30000;
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const kanal = ayarlar.kanal;
const fs = require("fs");
require("./util/eventLoader")(client);
const express = require("express");
const app = express();
const http = require("http");
const { Client, MessageEmbed } = require('discord.js');
var Jimp = require('jimp');
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const log = message => {
  console.log(` => { ${message} } `);
  
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`AKTİF: ${props.help.name}.`);
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
    } catch (e) {
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
    } catch (e) {
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
    } catch (e) {
      reject(e);
    }
  });
};

////////////////////////

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  return permlvl;
};





client.on("ready", () => {//splashen
  client.user.setPresence({
    game: { name: `ARDEALOJI.JS`, type: "WATCHING" },
    status: "online"
  });
});



// İSİM YAŞ İSİM DEĞİŞTİRME 

client.on("guildMemberAdd", member => {
  let tag = ayarlar.tag;
  //splashen
  member.setNickname(`${tag} İsim • Yaş`);
});

// İSİM YAŞ İSİM DEĞİŞTİRME SON






//BOT ROLÜ

client.on(`guildMemberAdd`, async member => {//splashen
  let botrol = ayarlar.botROL;
if(!member.bot) return;
member.roles.add(botrol)
})

// BOT ROLÜ SON




// kayıtsız rolü

client.on(`guildMemberAdd`, async member => {
  let kayıtsızROL = ayarlar.kayıtsızROL;
if(member.bot) return;
member.roles.add(kayıtsızROL)
})

/// kayıtsız rolü son
//splashen

 client.on("guildMemberAdd", member => {

if(member.user.username.includes("⋇")){
member.roles.add("775497535140790294")
member.roles.remove("731176302115291206")
member.send("Kullanılmaması gereken veya girişinizi engelleyen tag'a sahipsiniz!")
}
})


client.on("userUpdate", async(eski, yeni) => {
  if(eski.username !== yeni.username) {
  if(!yeni.username.includes("Δ") && client.guilds.cache.get("408959448908955658").members.cache.get(yeni.id).roles.has("744451826744688681")) {
     client.guilds.cacge.get("408959448908955658").members.cache.get(yeni.id).roles.remove("744451826744688681")
     client.channels.cache.get('752089647110422548').send(`:broken_heart: ${yeni}, Δ tagını çıkardı!`)
    }
     if(yeni.username.includes("Δ") && !client.guilds.cacge.get("408959448908955658").members.cache.get(yeni.id).roles.has("744451826744688681")) {
      client.channels.cache.get('752089647110422548').send(`:heart: ${yeni}, Δ tagını aldı!`)
      client.guilds.cache.get("408959448908955658").members.cache.get(yeni.id).roles.add("744451826744688681")
     }
  }
  })





//splashen

// BOT OTOROL

client.on('guildMemberAdd', async member => {//splashen
if(member.user.bot) {
  const botROL = ayarlar.botROL
member.roles.add(botROL)
}
})
// GİRİŞ 
  client.on("guildMemberAdd", member => { 
    const moment = require('moment');
  const kanal = ayarlar.giriskanal;
  let user = client.users.cache.get(member.id);
  require("moment-duration-format");
    const tarih = new Date().getTime() - user.createdAt.getTime();  
  const embed = new Discord.MessageEmbed()
  let rol = ayarlar.kayıtsızROL
 member.roles.add(rol)//splashen

  var kontrol;
if (tarih < 1296000000) kontrol = 'Hesabın: **Şüpheli**'
if (tarih > 1296000000) kontrol = 'Hesabın: **Güvenli**'
  moment.locale("tr");
  let kanal1 = client.channels.cache.find(x => x.id === kanal);
    let giris = new Discord.MessageEmbed()
    .setDescription(`
 » • AVVA'ya Hoşgeldin ${member}
 
 » •   ${kontrol}  
 
 » • Seninle birlikte **${member.guild.memberCount}** kişiyiz.
 
 » • [ **Δ** ] Tagımızı alarak ailemize katılabilirsiniz!
 
 » • <@&${ayarlar.yetkiliROL}> rolüne sahip yetkililer seninle ilgilenecektir.
 
 » • Ses teyit odasında kaydınızı yaptırabilirsiniz!  
 
 » • Hesabın Oluşturulma Tarihi: \n • \` ${moment(member.user.createdAt).format("YYYY DD MMMM dddd (hh:mm:ss)")} \`
 

`)//splashen
    .setImage('https://media.discordapp.net/attachments/784075636275937322/788164488808366080/tenor_2.gif?width=398&height=222')
    .setTimestamp()
    
      client.channels.cache.find(x => x.id === kanal).send(`<@&${ayarlar.yetkiliROL}>`)
client.channels.cache.find(x => x.id === kanal).send(giris)
    
  });
// GİRİŞ SON
//splashen

client.login(ayarlar.token);