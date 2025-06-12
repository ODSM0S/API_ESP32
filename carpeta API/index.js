const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());

const uri = process.env.MONGO_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error en conexión:', err));

const Mensaje = mongoose.model('Mensaje', {
  mensaje: String,
  usuario: String,
  fecha: String
});

app.get('/ultimo-mensaje', async (req, res) => {
  try {
    const data = await Mensaje.findOne().sort({ _id: -1 });
    res.json(data || {});
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el mensaje' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 API corriendo en puerto ${PORT}`);
});
