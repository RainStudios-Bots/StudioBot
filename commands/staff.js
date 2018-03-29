exports.run = (client, msg, args) => {
  let staff = msg.guild.roles.find("name", "Staff");
  if (!staff) return msg.channel.send("I cannot find the `Staff` role");
  if (args[0] === "add") {
    if (msg.author.id != '203516441683558400' || '165882544976429057' || '283739077507809288') return msg.channel.send("Hey! You can't add staff silly.");
    let user = msg.mentions.users.first();
    if (msg.guild.member(user).roles.has(staff.id)) return msg.channel.send("That user already has staff.");
    else {
      msg.guild.member(user).addRole(staff, "Staff added by " + msg.author.id).then(() => {
        msg.channel.send(user + "Has been added as a staff member.");
      });
    }
  }
}