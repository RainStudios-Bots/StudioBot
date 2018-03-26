exports.run = (client, msg, args) => {
  msg.channel.send('Ping?')
  .then(msg2 => {
    msg2.edit(`Pong! (took: ${msg2.createdTimestamp - msg.createdTimestamp}ms)`);
  });
}
