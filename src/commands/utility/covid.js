const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const { MESSAGES, EMBED_COLORS } = require("@root/config.js");
const { getJson } = require("@helpers/HttpUtils");
const timestampToDate = require("timestamp-to-date");

/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "covid",
  description: "Obtenez des statistiques covid pour un pays",
  cooldown: 5,
  category: "UTILITY",
  botPermissions: ["EmbedLinks"],
  command: {
    enabled: true,
    usage: "<country>",
    minArgsCount: 1,
  },
  slashCommand: {
    enabled: true,
    options: [
      {
        name: "country",
        description: "Nom du pays pour obtenir des statistiques covid pour",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },

  async messageRun(message, args) {
    const country = args.join(" ");
    const response = await getCovid(country);
    await message.safeReply(response);
  },

  async interactionRun(interaction) {
    const country = interaction.options.getString("country");
    const response = await getCovid(country);
    await interaction.followUp(response);
  },
};

async function getCovid(country) {
  const response = await getJson(`https://disease.sh/v2/countries/${country}`);

  if (response.status === 404) return "```css\nLe pays avec le nom fourni n'est pas trouvé```";
  if (!response.success) return MESSAGES.API_ERROR;
  const { data } = response;

  const mg = timestampToDate(data?.updated, "dd.MM.yyyy at HH:mm");
  const embed = new EmbedBuilder()
    .setTitle(`Covid - ${data?.country}`)
    .setThumbnail(data?.countryInfo.flag)
    .setColor(EMBED_COLORS.BOT_EMBED)
    .addFields(
      {
        name: "Cas Total",
        value: data?.cases.toString(),
        inline: true,
      },
      {
        name: "Cas Aujourd'hui",
        value: data?.todayCases.toString(),
        inline: true,
      },
      {
        name: "Morts Total",
        value: data?.deaths.toString(),
        inline: true,
      },
      {
        name: "Morts Aujourd'huu",
        value: data?.todayDeaths.toString(),
        inline: true,
      },
      {
        name: "Retabli",
        value: data?.recovered.toString(),
        inline: true,
      },
      {
        name: "Actif",
        value: data?.active.toString(),
        inline: true,
      },
      {
        name: "Critique",
        value: data?.critical.toString(),
        inline: true,
      },
      {
        name: "Cas par 1 million",
        value: data?.casesPerOneMillion.toString(),
        inline: true,
      },
      {
        name: "Morts par 1 million",
        value: data?.deathsPerOneMillion.toString(),
        inline: true,
      }
    )
    .setFooter({ text: `Dernière mise a jour le ${mg}` });

  return { embeds: [embed] };
}
