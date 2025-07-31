const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = 'mongodb+srv://akbar:akbar123@cluster0.6vot4or.mongodb.net/heart_attack?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Model (non-strict supaya bisa fleksibel dengan field CSV)
const ReviewSchema = new mongoose.Schema({}, { collection: 'review', strict: false });
const Review = mongoose.model('Review', ReviewSchema);

// Endpoint
app.get('/api/reviews', async (req, res) => {
  try {
    const data = await Review.find().limit(100); // limit agar ringan
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
