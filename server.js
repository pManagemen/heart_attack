const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Ganti dengan MongoDB URI kamu
const mongoURI = 'mongodb+srv://akbar:akbar123@cluster0.6vot4or.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Koneksi MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('✅ Terhubung ke MongoDB'))
  .catch(err => console.error('❌ Gagal konek ke MongoDB:', err));

// Skema dinamis untuk koleksi heart_attack atau reviews
const HeartSchema = new mongoose.Schema({}, { collection: 'heart_attack', strict: false });
const Heart = mongoose.model('Heart', HeartSchema);

// Menyajikan file statis (index.html)
app.use(express.static(path.join(__dirname)));

// Endpoint API
app.get('/api/heart', async (req, res) => {
  try {
    const data = await Heart.find().limit(100);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil data' });
  }
});

// Jalankan server
app.listen(port, () => {
  console.log(`🚀 Server berjalan di http://localhost:${port}`);
});
