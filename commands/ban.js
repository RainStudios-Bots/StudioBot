exports.run = (client, msg, args) => {
  const Discord = require('discord.js');
  let staff = msg.guild.roles.find("name", "Staff");
  if (!staff) return msg.channel.send("I cannot find the `Staff` role");
  let reason = args.slice(1).join(' ');
  let user = msg.mentions.users.first();
  let modlog = msg.guild.channels.find('name', 'logs');
  if (!modlog) return msg.reply('I cannot find a mod-log channel');
  if (!msg.member.roles.has(staff.id)) return msg.reply("You require the staff role to execute this command.");
  if (reason.length < 1) return msg.reply('You must supply a reason for the ban.');
  if (msg.mentions.users.size < 1) return msg.reply('You must mention someone to ban them.').catch(console.error);

  if (!msg.guild.member(user).bannable) return msg.reply('I cannot ban that member');
  msg.guild.ban(user, 2);

  const banEmbed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .addField('Action:', 'Ban')
    .addField('User:', `${user.tag} (${user.id})`)
    .addField('Modrator:', `${msg.author.tag}`)
    .setThumbnail(user.displayAvatarURL)
    .addField('Reason', reason);
  return modlog.send(banEmbed);
};