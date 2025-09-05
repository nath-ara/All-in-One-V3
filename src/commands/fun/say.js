const { CommandInteraction, Message } = require("discord.js");

/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "say",
  description: "Le bot répète ton message",
  category: "FUN",

  command: {
    enabled: true,
    usage: "<texte>",
    minArgsCount: 1,
  },

  slashCommand: { enabled: true },

  // --- Commande classique ---
  /**
   * @param {Message} message
   * @param {string[]} args
   */
  async messageRun(message, args) {
    const text = args.join(" ");
    if (!text) return message.safeReply("❌ Tu dois fournir un message à répéter !");
    await message.channel.send(text);
  },

  // --- Slash Command ---
  /**
   * @param {CommandInteraction} interaction
   */
  async interactionRun(interaction) {
    const text = interaction.options.getString("message");
    if (!text) return interaction.followUp("❌ Tu dois fournir un message à répéter !");
    await interaction.followUp(text);
  },
};
