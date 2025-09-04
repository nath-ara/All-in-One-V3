const { PermissionsBitField } = require("discord.js");

/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "role",
  description: "Ajoute ou retire un rôle à un membre.",
  category: "MODERATION",
  botPermissions: ["ManageRoles"],

  command: {
    enabled: true,
    usage: "<add|remove> <@role> <@user>",
    minArgsCount: 3,
  },

  slashCommand: {
    enabled: true,
    options: [
      {
        name: "action",
        description: "Ajouter ou retirer un rôle",
        type: 3, // STRING
        required: true,
        choices: [
          { name: "add", value: "add" },
          { name: "remove", value: "remove" },
        ],
      },
      {
        name: "role",
        description: "Le rôle à ajouter ou retirer",
        type: 8, // ROLE
        required: true,
      },
      {
        name: "user",
        description: "L'utilisateur ciblé",
        type: 6, // USER
        required: true,
      },
    ],
  },

  // --- Commande classique ---
  async messageRun(message, args) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
      return message.safeReply("❌ Tu n'as pas la permission de gérer les rôles.");
    }

    const action = args[0]?.toLowerCase();
    if (!["add", "remove"].includes(action)) {
      return message.safeReply("❌ Utilise `add` ou `remove`.");
    }

    const role = message.mentions.roles.first();
    const member = message.mentions.members.first();
    if (!role || !member) {
      return message.safeReply("❌ Mentionne un rôle et un utilisateur valides.");
    }

    try {
      if (action === "add") {
        await member.roles.add(role);
        return message.safeReply(`✅ Rôle \`${role.name}\` ajouté à ${member.user.tag}`);
      } else {
        await member.roles.remove(role);
        return message.safeReply(`✅ Rôle \`${role.name}\` retiré de ${member.user.tag}`);
      }
    } catch (err) {
      message.client.logger.error("RoleCommand", err);
      return message.safeReply("❌ Impossible de modifier le rôle. Vérifie la hiérarchie et les permissions.");
    }
  },

  // --- Slash Command ---
  async interactionRun(interaction) {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
      return interaction.followUp("❌ Tu n'as pas la permission de gérer les rôles.");
    }

    const action = interaction.options.getString("action");
    const role = interaction.options.getRole("role");
    const member = interaction.options.getMember("user");

    if (!role || !member) {
      return interaction.followUp("❌ Rôle ou utilisateur invalide.");
    }

    try {
      if (action === "add") {
        await member.roles.add(role);
        return interaction.followUp(`✅ Rôle \`${role.name}\` ajouté à ${member.user.tag}`);
      } else {
        await member.roles.remove(role);
        return interaction.followUp(`✅ Rôle \`${role.name}\` retiré de ${member.user.tag}`);
      }
    } catch (err) {
      interaction.client.logger.error("RoleCommand", err);
      return interaction.followUp("❌ Impossible de modifier le rôle. Vérifie la hiérarchie et les permissions.");
    }
  },
};
