import { translate } from "api-translator";

export default async function translateHandler(req, res) {
    try {
        const {text, lang} = req.body;

        const translated = await Promise.all(
            text.map(element => translate(element, {from: "auto", to: lang}))
        );

        res.status(200).json({translated});
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ error: "Erro interno no servidor" });
    };
};