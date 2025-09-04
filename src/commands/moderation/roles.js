const { PermissionsBitField, SlashCommandBuilder } = require("discord.js");

/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "roles",
  description: "Ajoute ou retire un rôle à un membre.",
  category: "OWNER",
  botPermissions: ["ManageRoles", "EmbedLinks"],

  command: {
    enabled: true,
    minArgsCount: 2,
    usage: "<add|remove> <@role> <@user>",
  },

  slashCommand: {
    enabled: true,
    builder: new SlashCommandBuilder()
      .setName("roles")
      .setDescription("Ajoute ou retire un rôle à un membre.")
      .addStringOption(option =>
        option.setName("action")
          .setDescription("Ajouter ou retirer le rôle")
          .setRequired(true)
          .addChoices(
            { name: "add", value: "add" },
            { name: "remove", value: "remove" }
          ))
      .addRoleOption(option =>
        option.setName("role")
          .setDescription("Le rôle à ajouter ou retirer")
          .setRequired(true))
      .addUserOption(option =>
        option.setName("user")
          .setDescription("L'utilisateur à qui appliquer le rôle")
          .setRequired(true)),
  },

  // --- Commande classique ---
  async messageRun(message, args) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
      return message.safeReply("❌ Tu n'as pas la permission de gérer les rôles !");
    }

    const action = args[0]?.toLowerCase();
    if (!["add", "remove"].includes(action)) {
      return message.safeReply("❌ Action invalide. Utilise `add` ou `remove`.");
    }

    const role = message.mentions.roles.first();
    if (!role) return message.safeReply("❌ Mentionne un rôle valide.");

    const member = message.mentions.members.first();
    if (!member) return message.safeReply("❌ Mentionne un utilisateur valide.");

    try {
      if (action === "add") {
        await member.roles.add(role);
        return message.safeReply(`✅ Rôle \`${role.name}\` ajouté à \`${member.user.tag}\``);
      } else {
        await member.roles.remove(role);
        return message.safeReply(`✅ Rôle \`${role.name}\` retiré de \`${member.user.tag}\``);
      }
    } catch (err) {
      message.client.logger.error("RoleCommand", err);
      return message.safeReply("❌ Impossible de modifier le rôle. Vérifie la hiérarchie et les permissions.");
    }
  },

  // --- Slash Command ---
  async interactionRun(interaction) {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
      return interaction.reply({ content: "❌ Tu n'as pas la permission de gérer les rôles !", ephemeral: true });
    }

    const action = interaction.options.getString("action");
    const role = interaction.options.getRole("role");
    const member = interaction.options.getMember("user");

    if (!role || !member) {
      return interaction.reply({ content: "❌ Rôle ou utilisateur introuvable.", ephemeral: true });
    }

    try {
      if (action === "add") {
        await member.roles.add(role);
        return interaction.reply({
          content: `✅ Rôle \`${role.name}\` ajouté à \`${member.user.tag}\``,
          ephemeral: true
        });
      } else {
        await member.roles.remove(role);
        return interaction.reply({
          content: `✅ Rôle \`${role.name}\` retiré de \`${member.user.tag}\``,
          ephemeral: true
        });
      }
    } catch (err) {
      interaction.client.logger.error("RoleCommand", err);
      return interaction.reply({
        content: "❌ Impossible de modifier le rôle. Vérifie la hiérarchie et les permissions.",
        ephemeral: true
      });
    }
  },
};
