// backend/traductor.js
import express from 'express';
import fetch from 'node-fetch';

const traductorenRouter = express.Router();

traductorenRouter.post('/translate', async (req, res) => {
  try {
    const { contenido } = req.body;
    const authKey = '00fbeb47-2abe-42bc-b5d1-a67dea4482b3:fx';

    const translationResults = await Promise.all(
      contenido.map(async (text) => {
        const url = 'https://api-free.deepl.com/v2/translate';
        const data = {
          text: [text],
          source_lang: 'es',
          target_lang: 'en',
        };

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `DeepL-Auth-Key ${authKey}`,
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error(`Error en la solicitud de traducción: ${response.statusText}`);
        }

        const translationData = await response.json();
        return translationData.translations[0].text;
      })
    );

    const responseObj = {
      traduccion: translationResults.map((texto, index) => ({
        id: index,
        texto,
      })),
    };

    res.json(responseObj);
  } catch (error) {
    console.error('Error en la traducción:', error.message);
    res.status(500).json({ error: 'Error en la traducción', message: error.message });
  }
});

export default traductorenRouter;
