/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "say",
  description: "Le bot répète ton message",
  category: "FUN",

  command: {
    enabled: true,
    usage: "<message>",
    minArgsCount: 1,
  },

  slashCommand: {
    enabled: true,
    options: [
      {
        name: "message",
        description: "Le message à répéter",
        type: 3, // STRING
        required: true,
      },
    ],
  },

  async messageRun(message, args) {
    const text = args.join(" ");
    await message.channel.send(text);
  },

  async interactionRun(interaction) {
    const text = interaction.options.getString("message");
    await interaction.followUp(text);
  },
};
