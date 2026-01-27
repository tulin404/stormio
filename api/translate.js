import { translate } from "@vitalets/google-translate-api";

export default async function translateHandler(req, res) {
    try {
        const {text, lang} = req.body;

        if (!Array.isArray(text) || text.length === 0) {
            return res.status(400).json({ error: "Campo 'text' inválido ou vazio" });
        }

        if (!lang || typeof lang !== "string") {
            return res.status(400).json({ error: "Campo 'lang' inválido" });
        }

        const translated = await Promise.all(
            text.map(async element => {
                const obj = await translate(element, {to: lang})
                return obj
            }));

        res.status(200).json({translated});
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ error: "Erro interno no servidor" });
    };
};