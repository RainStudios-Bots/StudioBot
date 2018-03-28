exports.run = (client,msg,args) => {
    return msg.reply("Command is borken, not sure why but it will be fixed later");
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
            console.log(e.stack)
        }
    }
  
    if (!pRole) {
        try {
        msg.guild.createRole({
        name: 'Pinger',
        mentionable: true
    })
        .then(role => console.log(`Created new role with name ${role.name}`))
        .catch(console.error) 
    }
        catch(e) {
            console.log(e.stack)
        }
    }


    if(msg.member.roles.has(bIRole.id) && msg.member.roles.has(pRole.id)) {
        let eEmbed = new Discord.RichEmbed()
        .setTitle("Error")
        .setDescription("You already have all avaliable roles. \n \n To check your roles use ~role check \n \n To check what roles are avaliable use ~role")
        .setAuthor("Role Manager -", msg.author.displayAvatarURl)
        .setTimestamp();
        return msg.reply(eEmbed);
      } 
    if (args.length < 1) {
        let aRoles = new Discord.RichEmbed()
        .setTitle("Avaliable Roles:")
        .setDescription("\`Bot Info\` \`Pinger\`")
        .addField("Usage: ", "~role <rolename>")
        .setAuthor("Role Manager -", msg.member.displayAvatarURl)
        .setTimestamp();
         return msg.reply(aRoles);
    }

    const eSucces = new Discord.RichEmbed()
    .setAuthor("Role Manager -", msg.member.displayAvatarURl)
    .setDescription("Succes!! addded " + args[0] + "to you")
    .setTimestamp();

    if (args[0].toLowerCase() === "bot info") {
     let member = msg.member;
     member.addRole(bIRole).catch(err => {
         msg.channel.send( "```\n" + err + "\n```")
     });
     msg.reply(eSucces);
    }
    else if (args[0].toLowerCase === "pinger") {
        let member = msg.member;
        member.addRole(pRole).catch(err => {
            msg.channel.send( "```\n" + err + "\n```")
        });
        msg.reply(eSucces);
    }

    else if (args[0].toLowerCase() === "check") {
        if(msg.member.roles.has(bIRole.id)) {
            let bBool = true;
        }
        if(msg.member.roles.has(pRole.id)) {
            let pBool = true;
        }

        let currentRoles = new Discord.RichEmbed()
        .setAuthor("Role Manger -", msg.member.displayAvatarURl)
        .addField("Bot Info: ", bBool)
        .addField("Pinger", pBool)
        .setTimestamp();
    }
}