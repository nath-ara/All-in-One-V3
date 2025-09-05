const { PermissionsBitField, ChannelType } = require("discord.js");

/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "channel",
  description: "Créer ou supprimer un salon sur le serveur",
  category: "OWNER",
  botPermissions: [PermissionsBitField.Flags.ManageChannels],

  command: {
    enabled: true,
    usage: "<create|delete> <nom-du-salon>",
    minArgsCount: 2,
  },

  slashCommand: {
    enabled: true,
    options: [
      {
        name: "action",
        description: "Créer ou supprimer un salon",
        type: 3, // STRING
        required: true,
        choices: [
          { name: "Créer", value: "create" },
          { name: "Supprimer", value: "delete" },
        ],
      },
      {
        name: "name",
        description: "Nom du salon",
        type: 3, // STRING
        required: true,
      },
    ],
  },

  // --- Commande préfixe ---
  async messageRun(message, args) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
      return message.safeReply("❌ Tu n'as pas la permission de gérer les salons.");
    }

    const action = args[0].toLowerCase();
    const channelName = args.slice(1).join(" ");
    if (!["create", "delete"].includes(action)) {
      return message.safeReply("❌ Utilise `create` ou `delete`.");
    }

    try {
      if (action === "create") {
        await message.guild.channels.create({
          name: channelName,
          type: ChannelType.GuildText,
        });
        return message.safeReply(`✅ Salon \`${channelName}\` créé !`);
      } else {
        const channel = message.guild.channels.cache.find(
          (ch) => ch.name === channelName
        );
        if (!channel) return message.safeReply("❌ Salon introuvable !");
        await channel.delete();
        return message.safeReply(`✅ Salon \`${channelName}\` supprimé !`);
      }
    } catch (err) {
      console.error(err);
      return message.safeReply("❌ Impossible de gérer le salon. Vérifie la hiérarchie et les permissions.");
    }
  },

  // --- Slash Command ---
  async interactionRun(interaction) {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
      return interaction.followUp("❌ Tu n'as pas la permission de gérer les salons.");
    }

    const action = interaction.options.getString("action");
    const name = interaction.options.getString("name");

    try {
      if (action === "create") {
        await interaction.guild.channels.create({
          name: name,
          type: ChannelType.GuildText,
        });
        return interaction.followUp(`✅ Salon \`${name}\` créé !`);
      } else {
        const channel = interaction.guild.channels.cache.find((ch) => ch.name === name);
        if (!channel) return interaction.followUp("❌ Salon introuvable !");
        await channel.delete();
        return interaction.followUp(`✅ Salon \`${name}\` supprimé !`);
      }
    } catch (err) {
      console.error(err);
      return interaction.followUp("❌ Impossible de gérer le salon. Vérifie la hiérarchie et les permissions.");
    }
  },
};
