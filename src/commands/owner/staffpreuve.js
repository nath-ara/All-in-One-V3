const { EmbedBuilder } = require("discord.js");

module.exports = (client) => {
  const name = "staffpreuve"; // Nom de la commande pour référence
  const prefix = "?"; // Préfixe unique pour cette commande

  // Preuves personnalisées par ID
  const staffPreuves = {
    "1179587826669592587": new EmbedBuilder()
      .setTitle("📜 Preuve Staff")
      .setDescription("Voici la preuve officielle que <@1179587826669592587> est Owner ✅")
      .setColor("Blue"),

    "1204961543528382467": new EmbedBuilder()
      .setTitle("📜 Preuve Staff")
      .setDescription("Voici la preuve officielle que <@1204961543528382467> est Owner ✅")
      .setColor("Red"),

    "1341478551764860958": new EmbedBuilder()
      .setTitle("📜 Preuve Staff")
      .setDescription("Voici la preuve officielle que <@1341478551764860958> est Owner ✅")
      .setColor("Green"),
  };

  // Listener direct sur les messages
  client.on("messageCreate", (message) => {
    if (message.author.bot) return; // Ignore les bots
    if (message.content !== `${prefix}${name}`) return; // Commande exacte

    const preuve = staffPreuves[message.author.id];
    if (!preuve) return message.reply("❌ Tu n'es pas autorisé à utiliser cette commande.");

    message.channel.send({ embeds: [preuve] }).catch(console.error);
  });
};
