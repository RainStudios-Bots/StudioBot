exports.run = (client, msg, args) => {
    let Discord = require('discord.js');
    let aEmbed = new Discord.RichEmbed()
    .setAuthor("Application Info -", msg.guild.iconURL)
    .setDescription("[Click me](https://docs.google.com/document/d/1HSDzk73Bjz5X2hYWTYII7w3IZ7qkDl901SIB4cO_4LU/edit?usp=sharing) to get the format to apply, then dm RainDropInMC or a Community Manager with the filled out questions.")
    .setTimestamp();
    return msg.channel.send(aEmbed);
}