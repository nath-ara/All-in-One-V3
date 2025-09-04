const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "staffpreuve",
  description: "Affiche la preuve staff (uniquement via ?staffpreuve)",
  botPermissions: ["EmbedLinks"],
  command: {
    enabled: false, // désactive la version avec le préfixe global de ton bot
    usage: "",
    minArgsCount: 0,
  },
  slashCommand: { enabled: false },

  async messageRun(message) {
    // Si jamais quelqu’un essaye via ton préfixe global
    return message.safeReply("❌ Utilise `?staffpreuve` pour cette commande.");
  },

  // Cette fonction va être appelée par ton handler quand il charge la commande
  init(client) {
    const PREFIX = "?";
    const NAME = "staffpreuve";

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

    client.on("messageCreate", (message) => {
      if (message.author.bot) return;
      if (message.content !== `${PREFIX}${NAME}`) return;

      const preuve = staffPreuves[message.author.id];
      if (!preuve) {
        return message.reply("❌ Tu n'es pas autorisé à utiliser cette commande.");
      }

      message.channel.send({ embeds: [preuve] }).catch(console.error);
    });
  },
};
