import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import rateLimit from "express-rate-limit";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors()); 

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100 
  });
  app.use(limiter);

app.get('/api/photo-gallery-feed-page/:page', async (req, res) => {
    try {
        const { page } = req.params;
        const apiUrl = `https://englishapi.pinkvilla.com/app-api/v1/photo-gallery-feed-page/page/${page}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data from external API' });
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
 