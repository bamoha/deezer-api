import express from 'express';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Proxy Deezer API requests
app.get('/deezer/*', async (req, res) => {
    try {
        const deezerApiUrl = `https://api.deezer.com/${req.params[0]}?${req._parsedUrl.query || ''}`;
        const response = await axios.get(deezerApiUrl);
        res.json(response.data);
    } catch (error) {
        console.error('Error proxying Deezer API request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Deezer API Proxy Server is running on port ${PORT}`);
});
