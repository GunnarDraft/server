const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

const whiteList = ['http://localhost:3000',
    'http://localhost:3001',
    'https://prueba-tecnica-ya-ganaste.vercel.app']
app.use(cors({ origin: whiteList }));
const allowCors = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', whiteList);
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
    next();
};


app.use('/api/banks', allowCors);

app.get('/api/banks', async (req, res) => {
    try {
        // Hacer la solicitud al servicio externo
        const response = await axios.get('https://dev.obtenmas.com/catom/api/challenge/banks');

        // Responder con los datos recibidos
        res.json(response.data); 
    } catch (error) {
        // Manejar errores
        console.error('Error en la solicitud al servicio externo:', error.message);
        res.status(500).json({ error: 'Error en la solicitud al servicio externo' });
    }
});


app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
