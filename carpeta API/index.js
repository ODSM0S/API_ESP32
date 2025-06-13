const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());

// Usa el puerto asignado por Render automáticamente
const PORT = process.env.PORT || 3000;

// Usa la variable de entorno MONGO_URI que configuraste en Render
const uri = process.env.MONGO_URI;

// Conexión a MongoDB Atlas
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch(err => console.error('❌ Error en conexión a MongoDB:', err));

// Modelo del documento
const Mensaje = mongoose.model('Mensaje', {
  mensaje: String,
  usuario: String,
  fecha: String
});

// Endpoint principal
app.get('/', (req, res) => {
  res.send('✅ API ESP32 MongoDB está en línea');
});

app.get('/ultimo-mensaje', async (req, res) => {
  try {
    const data = await Mensaje.findOne().sort({ _id: -1 });
    res.json(data || {});
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el mensaje' });
  }
});

// Iniciar servidor en el puerto dinámico de Render
app.listen(PORT, () => {
  console.log(`🚀 API corriendo en puerto ${PORT}`);
});
