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

  slashCommand: { enabled: false }, // désactivé

  // --- Commande préfixe ---
  async messageRun(message, args) {
    // Vérifie que l'utilisateur a fourni un texte
    const text = args.join(" ");
    if (!text) return message.safeReply("❌ Tu dois fournir un message à répéter !");

    // Supprime le message original si possible
    if (message.deletable) await message.delete().catch(() => {});

    // Envoie le texte dans le channel actuel
    await message.channel.send(text);
  },
};

