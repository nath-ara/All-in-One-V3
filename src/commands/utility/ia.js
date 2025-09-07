const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Mets ta clé dans .env
});

module.exports = {
  name: "messageCreate",
  async execute(message) {
    // 🔹 Ignore les messages des bots
    if (message.author.bot) return;

    // 🔹 Vérifie si le message commence par "Kyra"
    if (message.content.toLowerCase().startsWith("kyra")) {
      // Supprime "Kyra" du début pour garder uniquement la question
      const userMessage = message.content.replace(/kyra/i, "").trim();

      // Si l’utilisateur dit juste "Kyra"
      if (!userMessage) {
        return message.reply("Oui ? 👀");
      }

      try {
        // 🔹 Appel à l'IA (OpenAI)
        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "Tu es Kyra, une assistante virtuelle sympa, drôle et utile qui vit sur Discord. Réponds de façon naturelle.",
            },
            { role: "user", content: userMessage },
          ],
        });

        const botReply = completion.choices[0].message.content;

        // 🔹 Envoie la réponse
        await message.reply(botReply);
      } catch (err) {
        console.error("Erreur IA:", err);
        await message.reply("❌ Oups, je n’ai pas réussi à répondre cette fois.");
      }
    }
  },
};
