const { EmbedBuilder } = require("discord.js");

/**
 * Commande Staff Preuve avec préfixe personnalisé (?)
 */
module.exports = {
  name: "staffpreuve",
  description: "Affiche la preuve staff personnalisée avec un préfixe spécial",
  botPermissions: ["EmbedLinks"],
  command: {
    enabled: false, // ❌ on désactive l’appel via le handler classique
    usage: "",
    minArgsCount: 0,
  },
  slashCommand: {
    enabled: false, // pas dispo en slash
  },

  /**
   * Cette fonction est appelée pour tous les messages
   */
  async messageRun(message) {
    // On écoute UNIQUEMENT le préfixe spécial
    if (message.content !== "?staffpreuve") return;

    const preuve = getStaffPreuve(message.author.id);
    if (!preuve) {
      return message.safeReply("❌ Tu n'es pas un owner du bot.");
    }

    await message.safeReply({ embeds: [preuve] });
  },
};

// ------------------ CONFIG ------------------ //

/**
 * Retourne un embed différent selon l’ID
 */
const getStaffPreuve = (userId) => {
  const preuves = {
    "1179587826669592587": new EmbedBuilder()
      .setTitle("📜 Preuve Staff")
      .setDescription("Voici la preuve officielle que <@1179587826669592587> est Owner est gestionnaire du bot
                      ✅")
      .setColor("Blue"),

    "1204961543528382467": new EmbedBuilder()
      .setTitle("📜 Preuve Staff")
      .setDescription("Voici la preuve officielle que <@1204961543528382467> est Owner est codeur ✅")
      .setColor("Red"),

    "1341478551764860958": new EmbedBuilder()
      .setTitle("📜 Preuve Staff")
      .setDescription("Voici la preuve officielle que <@1341478551764860958> est Owner principale du bot est codeur... ✅")
      .setColor("Green"),
  };

  return preuves[userId] || null;
};
