const { PermissionsBitField } = require("discord.js");

/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "unlock",
  description: "Déverrouille le salon actuel (unlock)",
  category: "MODERATION",
  botPermissions: ["ManageChannels"],

  command: {
    enabled: true,
    usage: "",
    minArgsCount: 0,
  },

  slashCommand: {
    enabled: true,
  },

  // --- Commande préfixe ---
  async messageRun(message) {
    const channel = message.channel;

    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
      return message.safeReply("❌ Tu n'as pas la permission de gérer ce salon.");
    }

    try {
      await channel.permissionOverwrites.edit(message.guild.roles.everyone, {
        SendMessages: true,
      });
      return message.safeReply(`🔓 Salon \`${channel.name}\` déverrouillé !`);
    } catch (err) {
      console.error(err);
      return message.safeReply("❌ Impossible de déverrouiller ce salon.");
    }
  },

  // --- Slash command ---
  async interactionRun(interaction) {
    const channel = interaction.channel;

    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
      return interaction.followUp("❌ Tu n'as pas la permission de gérer ce salon.");
    }

    try {
      await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
        SendMessages: true,
      });
      return interaction.followUp(`🔓 Salon \`${channel.name}\` déverrouillé !`);
    } catch (err) {
      console.error(err);
      return interaction.followUp("❌ Impossible de déverrouiller ce salon.");
    }
  },
};
