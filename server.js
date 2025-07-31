const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

// Koneksi ke MongoDB tanpa .env
mongoose.connect('mongodb://127.0.0.1:27017/sample_mflix', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Skema data (non-strict untuk menyesuaikan isi koleksi)
const Heart = mongoose.model('Heart', new mongoose.Schema({}, {
  collection: 'reviews', // pastikan ini koleksi yang berisi data heart attack
  strict: false
}));

// Middleware untuk file statis (index.html di root folder)
app.use(express.static(path.join(__dirname)));

// Endpoint untuk ambil data heart attack
app.get('/heart', async (req, res) => {
  try {
    const data = await Heart.find().limit(100); // ambil 100 data pertama
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal mengambil data heart attack' });
  }
});

// Jalankan server di port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
