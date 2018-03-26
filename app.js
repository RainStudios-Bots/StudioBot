const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const config = require('./config.json');
const prefix = config.prefix;
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageDelete', msg => {
  if (msg.author.bot) return;
  if (!msg) return msg.reply("Something went wrong?")
  let modlog = msg.guild.channels.find("name", "logs");
  if (!modlog) return msg.reply("Something went wrong! (Could not find modlog)")
  let deleteEmbed = new Discord.RichEmbed()
  .addField("Message Author: ", msg.author.tag)
  .addField("Message Content: ", msg.content)
  .addField("In channel: ", msg.channel)
  .setThumbnail(msg.author.displayAvatarURL)
  .setTimestamp();
  modlog.send(deleteEmbed);
});

client.on('messageUpdate', (oldMessage, newMessage) => {
  if (oldMessage.author.bot) return;
  if (!oldMessage || !newMessage) return oldMessage.reply("Something went wrong?")
  let modlog = oldMessage.guild.channels.find("name", "logs");
  if (!modlog) return oldMessage.reply("Something went wrong! (Could not find modlog)")
  let editEmbed = new Discord.RichEmbed()
  .setDescription("Before Edit: " + oldMessage.content + ", After Edit: " + newMessage.content)
  .addField("Message Author: ", newMessage.author.tag)
  .addField("In channel: ", newMessage.channel)
  .setThumbnail(newMessage.author.displayAvatarURL)
  .setTimestamp();
  modlog.send(editEmbed);
});

client.on('message', msg => {
 if (msg.author.bot) return;
 if(msg.content.indexOf(config.prefix) !== 0) return;
if (command.channel.id != "427646753215610881") return msg.reply("The bot is in development, try again later!")
 const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
 const command = args.shift().toLowerCase();

 try {
   let commandFile = require(`./commands/${command}.js`);
   commandFile.run(client, msg, args);
 } catch (err) {
   console.error(err);
 }
});

client.login(config.token);
