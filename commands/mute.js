exports.run = (client, msg, args) => {
    const Discord = require('discord.js');
    let modlog = msg.guild.channels.find("name", "logs");
    if (!modlog) return msg.channel.send("Cannot find logs channel!");
    let muteRole = msg.guild.roles.find("name", "Muted");
    if (!muteRole) return msg.channel.send("Cannot find muted role!");
    const user = msg.mentions.users.first();
    if (msg.mentions.users.size < 1) return msg.reply('You must mention someone to mute them.').catch(console.error);
    let reason = args.slice(1).join(" ");
    if (!msg.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return msg.channel,send('I do not have the correct permissions.').catch(console.error);

    if (msg.guild.member(user).roles.has(muteRole.id)) {
        msg.guild.member(user).removeRole(muteRole).then(() => {
            msg.reply(user + " has been succesfully unmuted!");
            let unmute = new Discord.RichEmbed()
            .setAuthor("Unmute -", msg.guild.iconURL)
            .addField("User", user.tag)
            .addField("Moderator", msg.author.tag)
            .setDescription("**Reason** \n" + reason)
            .setThumbnail(user.displayAvatarURL)
            .setFooter(`(${user.id})`)
            .setTimestamp();
            modlog.send(unmute)
        });  
    } else {
        msg.guild.member(user).addRole(muteRole).then(() => {
            msg.reply(user + " has been succesfully muted!");
          let mute = new Discord.RichEmbed()
            .setAuthor("Mute -", msg.guild.iconURL)
            .addField("User", user.tag)
            .addField("Moderator", msg.author.tag)
            .setDescription("**Reason** \n" + reason)
            .setThumbnail(user.displayAvatarURL)
            .setFooter(`(${user.id})`)
            .setTimestamp();
            modlog.send(mute);
        });
      }
}