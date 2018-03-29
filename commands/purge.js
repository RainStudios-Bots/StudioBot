exports.run = (client, msg, args) => {
  const Discord = require("discord.js");
  let modlog = msg.guild.channels.find('name', 'logs');
  if (!modlog) return msg.reply('I cannot find a mod-log channel');
  let messagecount = parseInt(args.join(' ')) + 1;
  msg.channel.fetchMessages({
    limit: messagecount
  }).then(messages => msg.channel.bulkDelete(messages));
  const purgeEmbed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .addField('Action:', 'Purge')
    .addField('Messages Removed:', `${messagecount - 1}`)
    .addField('Modrator:', `${msg.author.tag}`);
  msg.channel.send(purgeEmbed).then(() => {
    msg.delete(180000);
  });
  return modlog.send(purgeEmbed);
};