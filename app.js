const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const ddif = require('return-deep-diff')
const config = require('./config.json');
const prefix = config.prefix;
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({
      game: {
        name: '~help | Singin\' in the rain.'
      },
      status: 'online'
    })
    .catch(console.error);
});

client.on('message', msg => {
  if (msg.channel.type === 'DM') return;
  if (msg.author.bot) return;
  if (msg.content.indexOf(config.prefix) !== 0) return;
  const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if (msg.channel.id !== "427646753215610881") return msg.reply("The bot is in development, try again later!");

  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, msg, args);
  } catch (err) {
    console.error(err);
  }
});

client.on('messageDelete', msg => {
  if (msg.channel.type === 'DM') return;
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
  if (oldMessage.channel.type === 'DM') return;
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


client.on('roleCreate', Role => {
  let modlog = Role.guild.channels.find("name", "logs");
  if (!modlog) return Role.guild.defaultChannel.send("Something went wrong! (Could not find modlog)")
  let newRoleEmbed = new Discord.RichEmbed()
    .addField("Role: ", "`" + Role.name + "`" + " has been created")
    .setThumbnail(Role.guild.iconURL)
    .setTimestamp();
  modlog.send(newRoleEmbed)
});

client.on('roleDelete', Role => {
  let modlog = Role.guild.channels.find("name", "logs");
  if (!modlog) return Role.guild.defaultChannel.send("Something went wrong! (Could not find modlog)")
  let deleteRoleEmbed = new Discord.RichEmbed()
    .setTitle("Role Removed")
    .addField("Role: ", "`" + Role.name + "`" + " has been deleted")
    .setThumbnail(Role.guild.iconURL)
    .setTimestamp();
  modlog.send(deleteRoleEmbed)
});

// client.on('roleUpdate', (oRole, nRole) => {
//   let modlog = nRole.guild.channels.find("name", "logs");
//   if (!modlog) return Role.guild.defaultChannel.send("Something went wrong! (Could not find modlog)")
//   let difference = ddif(oRole, nRole);
//   console.log(difference);
//   // let diffArray = Object.keys(difference).map(i => difference[i])
//   // console.log(diffArray);
//   // let splicedArray = diffArray.splice("{").splice(":");
//   // console.log(splicedArray);
//   // console.log(diffArray)
//   // let updateEmbed = new Discord.RichEmbed()
//   //   .addField("Role Changed", JSON.stringify(difference))
//   //   .setThumbnail(nRole.guild.iconURL);
//   // modlog.send(updateEmbed);
// });

client.on('guildBanAdd', (guild, user) => {
  let modlog = guild.channels.find("name", "logs");
  if (!modlog) return guild.defaultChannel.send("Something went wrong! (Could not find modlog)");
  let banAdd = new Discord.RichEmbed()
    .setTitle("Ban has been added")
    .setThumbnail(user.displayAvatarURL)
    .addField("Member Banned: ", user.tag `(${user.id})`)
    .addField("At: ", new Date())
    .setTimestamp();
  modlog.send(banAdd)
})

client.login(config.token);