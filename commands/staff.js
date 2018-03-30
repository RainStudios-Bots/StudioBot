exports.run = (client, msg, args) => {
  const Discord = require('discord.js');
  let staff = msg.guild.roles.find("name", "Staff");
  if (!staff) return msg.channel.send("I cannot find the `Staff` role");
  let modlog = msg.guild.channels.find("name", "logs");
  if (!modlog) return msg.channel.send("Cannot find logs channel!");
  if (args[0] === "add") {
    if (msg.author.id !== '283739077507809288' || '203516441683558400' || '165882544976429057') return msg.channel.send("Hey! You can't add staff silly.");
    let user = msg.mentions.users.first();
    if (msg.mentions.users.size < 1 ) return msg.channel.send('Please mention someone to add')
     if (msg.guild.member(user).roles.has(staff.id)) return msg.channel.send("That user already has staff.");
    else {
      msg.guild.member(user).addRole(staff, "Staff added by " + msg.author.id).then(() => {
        msg.channel.send(user + "Has been added as a staff member.");
        let newStaff =  new Discord.RichEmbed()
        .setAuthor("New Staff - ", msg.guild.iconURL)
        .addField("User: ", user.tag)
        .addField("Added By: ", msg.author.tag)
        .setFooter(`(${user.id}`)
        .setThumbnail(user.displayAvatarURL)
        .setTimestamp();
        modlog.send(newStaff);
      });
    }
  } else if(args[0] === "remove") {
    if (msg.author.id != '203516441683558400' || '165882544976429057' || '283739077507809288') return msg.channel.send("Hey! You can't remove staff silly.");
    if (!msg.guild.member(user).roles.has(staff.id)) return msg.channel.send("That user doesn't has staff.");
    else {
      msg.guild.member(user).removeRole(staff, "Staff removed by " + msg.author.id).then(() => {
        msg.channel.send(user + "Has been removed as a staff member.");
        let removedStaff =  new Discord.RichEmbed()
        .setAuthor("Removed Staff - ", msg.guild.iconURL)
        .addField("User: ", user.tag)
        .addField("Removed By: ", msg.author.tag)
        .setFooter(`(${user.id}`)
        .setThumbnail(user.displayAvatarURL)
        .setTimestamp();
        modlog.send(removedStaff);
      });
    }
  }
}