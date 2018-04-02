exports.run = (client,msg,args) => {
    let bBool = false;
    let pBool = false;
    const Discord = require('discord.js');
    const bIRole = msg.guild.roles.find("name", "Bot Info");
    const pRole = msg.guild.roles.find("name", "Pinger");
    if(!msg.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) {
        let erEmbed = new Discord.Embed()
        .setTitle("Error")
        .setAuthor("Role Manager -", msg.author.displayAvatarURl)
        .setDescription("I do not have the correct permissions to create roles.")
        .setTimestamp();
        return msg.channel.send(erEmbed);
    }
    if (!bIRole) {
        try {
        msg.guild.createRole({
        name: 'Bot Info',
        mentionable: true
    })
        .then(role => console.log(`Created new role with name ${role.name}`))
        .catch(console.error)
    }
        catch(e) {
            console.log(e.stack);
            msg.channel.send("Unable to create role, please setup role manually");
        }
    }

    if (!pRole) {
        try {
        msg.guild.createRole({
        name: 'Pinger',
        mentionable: true
    })
        .then(role => console.log(`Created new role with name ${role.name}`))
        .catch(console.error);
    }
        catch(e) {
            console.log(e.stack);
            msg.channel.send("Unable to create role, please setup role manually");
        }
    }


    if(msg.member.roles.has(bIRole.id) && msg.member.roles.has(pRole.id)) {
        let eEmbed = new Discord.RichEmbed()
        .setTitle("Error")
        .setDescription("You already have all avaliable roles. \n \n To check your roles use ~role check \n \n To check what roles are avaliable use ~role")
        .setAuthor("Role Manager -", msg.author.displayAvatarURl)
        .setTimestamp();
        return msg.channel.send(eEmbed);
      }
    if (args.length < 1) {
        let aRoles = new Discord.RichEmbed()
        .setTitle("Avaliable Roles:")
        .setDescription("\`Bot-Info\` \`Pinger\`")
        .addField("Usage: ", "~role <rolename>")
        .setAuthor("Role Manager -", msg.member.displayAvatarURl)
        .setTimestamp();
         return msg.channel.send(aRoles);
    }

    const eSucces = new Discord.RichEmbed()
    .setAuthor("Role Manager -", msg.member.displayAvatarURl)
    .setDescription("Succes! Added " + args[0] + " to you")
    .setTimestamp();


    switch (args[0].toLowerCase()) {
      case "bot-info":
      let member = msg.member;
      msg.guild.member(member).addRole(bIRole).catch(err => {
          msg.channel.send( "```\n" + err + "\n```")
      });
      return msg.channel.send(eSucces);
        break;
      case "pinger":
      console.log("ping");
       let member = msg.member;
       msg.guild.member(member).addRole(pRole).catch(err => {
           msg.channel.send( "```\n" + err + "\n```")
       });
      return msg.channel.send(eSucces);
        break;
      case "check":
      if(msg.member.roles.has(bIRole.id)) {
          bBool = true;
      }
      if(msg.member.roles.has(pRole.id)) {
          pBool = true;
      }

      let currentRoles = new Discord.RichEmbed()
      .setAuthor("Role Manger -", msg.author.displayAvatarURl)
      .addField("Bot Info: ", bBool, true)
      .addField("Pinger", pBool, true)
      .setTimestamp();
      return msg.channel.send(currentRoles);
        break;
      default:
        msg.channel.send("Role: " + "`" + role + "`" + "not found")
    }

    else if (args[0].toLowerCase() === "check") {

    }
}
