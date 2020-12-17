const Discord = require("discord.js")

exports.run = async(client, message) => {

const embed = new Discord.MessageEmbed()
.setTitle('Δ')
.setColor('RED')
message.channel.send(embed)
};
exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'tag',
  description: '',
  usage: ''
};