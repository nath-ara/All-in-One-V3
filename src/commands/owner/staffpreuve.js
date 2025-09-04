const { EmbedBuilder } = require("discord.js");

/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "staffpreuve",
  description: "Affiche la preuve staff personnalisée",
  botPermissions: ["EmbedLinks"],

  command: {
    enabled: true,
    usage: "",
    minArgsCount: 0,
  },

  slashCommand: {
    enabled: false, // mettre true si tu veux activer en slash
  },

  async messageRun(message) {
    const preuve = getStaffPreuve(message.author.id);
    if (!preuve)
      return message.safeReply("❌ Tu n'es pas un owner du bot.");
    await message.safeReply({ embeds: [preuve] });
  },

  async interactionRun(interaction) {
    const preuve = getStaffPreuve(interaction.user.id);
    if (!preuve)
      return interaction.followUp("❌ Tu n'es pas un owner du bot.");
    await interaction.followUp({ embeds: [preuve] });
  },
};

// ------------------ CONFIG ------------------ //

// Embeds personnalisés par ID
const getStaffPreuve = (userId) => {
  const preuves = {
    "1179587826669592587": new EmbedBuilder()
      .setTitle("📜 Preuve Staff")
      .setDescription("Voici la preuve officielle que <@1179587826669592587> est Owner est gestionnaire du bot. ✅")
      .setColor("Blue"),

    "1204961543528382467": new EmbedBuilder()
      .setTitle("📜 Preuve Staff")
      .setDescription("Voici la preuve officielle que <@1204961543528382467> est Owner est devellopeur. ✅")
      .setColor("Red"),

    "1341478551764860958": new EmbedBuilder()
      .setTitle("📜 Preuve Staff")
      .setDescription("Voici la preuve officielle que <@1341478551764860958> est Owner principales, developpeur... ✅")
      .setColor("Red"),
  };

  return preuves[userId] || null;
};
