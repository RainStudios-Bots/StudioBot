exports.run = (client, msg, args) => {
  const Discord = require('discord.js');
  const reason = args.slice(1).join(' ');
  client.unbanReason = reason;
  client.unbanAuth = msg.author;
  const user = args[0];
  const modlog = msg.guild.channels.find('name', 'logs');
  if (!modlog) return msg.reply('I cannot find a mod-log channel');
  if (reason.length < 1) return msg.reply('You must supply a reason for the unban.');
  if (!user) return msg.reply('You must supply a User Resolvable, such as a user id.').catch(console.error);
  msg.guild.unban(user);
  const unbanEmbed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .addField('Action:', 'Ban')
    .addField('User:', `${user.tag} (${user.id})`)
    .addField('Modrator:', `${msg.author.tag}`)
    .addField('Reason', reason);
  return modlog.send(unbanEmbed);
};