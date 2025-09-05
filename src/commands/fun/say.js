/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "say",
  description: "Le bot répète ton message et supprime ton message original",
  category: "FUN",

  command: {
    enabled: true,
    usage: "<texte>",
    minArgsCount: 1,
  },

  slashCommand: { enabled: true },

  // --- Commande classique (préfixe) ---
  async messageRun(message, args) {
    const text = args.join(" ");
    if (!text) return message.safeReply("❌ Tu dois fournir un message à répéter !");

    // Supprime le message de l'utilisateur
    if (message.deletable) await message.delete().catch(() => {});

    await message.channel.send(text);
  },

  // --- Slash Command ---
  async interactionRun(interaction) {
    const text = interaction.options.getString("message");
    if (!text) return interaction.followUp("❌ Tu dois fournir un message à répéter !");

    await interaction.followUp(text);
  },
};
