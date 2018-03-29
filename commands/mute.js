exports.run = (client, msg, args) => {
  const Discord = require('discord.js');
  const fs = require('fs');
  let modlog = msg.guild.channels.find("name", "logs");
  if (!modlog) return msg.channel.send("Cannot find logs channel!");
  let muteRole = msg.guild.roles.find("name", "Muted");
  if (!muteRole) return msg.channel.send("Cannot find muted role!");
  let user = msg.mentions.users.first();
  let useID = false;
  let muteUser;

  let caseNum = JSON.parse(fs.readFileSync("./caseSave.json", "utf8"));
  if (!caseNum[msg.guild.id]) {
    caseNum[msg.guild.id] = {
      caseNum: 0
    };
  }
  if (msg.mentions.users.size >= 1) return user = msg.mentions.users.first();
  if (msg.mentions.users.size < 1) {
    try {
      user = args[0];
      muteUser = msg.guild.members.get(user).user;
      if (!muteUser) return msg.channel.send("Could not find " + user);
      useID = true;
    } catch (e) {
      console.log(e);
    }
  } else {
    return msg.channel.send("You need to provide a user resolvable such as a mention or id.");
  }
  let reason = args.slice(1).join(" ");
  if (!msg.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return msg.channel.send('I do not have the correct permissions.').catch(console.error);

  if (msg.guild.member(user).roles.has(muteRole.id)) {
    if (useID === true) {
      console.log(useID);
      user = muteUser;
      console.log(muteUser);
    }
    msg.guild.member(user).removeRole(muteRole, "Unmuted").then(() => {
      caseNum[msg.guild.id]++;
      fs.writeFile("./caseSave.json", JSON.stringify(caseNum), (err) => {
        if (err) console.log(err)
      });
      msg.reply(user + " has been succesfully unmuted!");
      let unmute = new Discord.RichEmbed()
        .setAuthor("Unmute - Case #: " + caseNum, msg.guild.iconURL)
        .addField("User", user.tag)
        .addField("Moderator", msg.author.tag)
        .setDescription("**Reason** \n" + reason)
        .setThumbnail(user.displayAvatarURL)
        .setFooter(`(${user.id})`)
        .setTimestamp();
      return modlog.send(unmute)
    });
  } else {
    if (useID === true) {
      console.log(useID);
      user = muteUser;
      console.log(muteUser);
    }
    msg.guild.member(user).addRole(muteRole, "Muted by " + msg.author.id).then(() => {
      caseNum[msg.guild.id]++;
      fs.writeFile("./caseSave.json", JSON.stringify(caseNum), (err) => {
        if (err) console.log(err)
      });
      msg.reply(user + " has been succesfully muted!");
      let mute = new Discord.RichEmbed()
        .setAuthor("Mute - Case #: " + caseNum, msg.guild.iconURL)
        .addField("User", user.tag)
        .addField("Moderator", msg.author.tag)
        .setDescription("**Reason** \n" + reason)
        .setThumbnail(user.displayAvatarURL)
        .setFooter(`(${user.id})`)
        .setTimestamp();
      return modlog.send(mute);
    });
  }
}