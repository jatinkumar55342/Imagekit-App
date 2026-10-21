const express = require('express');
const cors = require('cors');
const multer = require('multer');
const Post = require('./model/post.model');
const imagekit = require('./services/imagekit.service');

const app = express();

// Multer: memory storage, 10 MB file size limit
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
});

app.use(express.json({ limit: '1mb' }));

const allowedOrigins = (process.env.CLIENT_URL || '')
  .split(',')
  .map((url) => url.trim().replace(/\/$/, ''))
  .filter(Boolean);

const corsOptions = {
  origin(origin, cb) {
    if (!origin) return cb(null, true);

    if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
      return cb(null, true);
    }

    // Allow any *.vercel.app subdomain for preview deployments
    if (/^https:\/\/[^.]+\.vercel\.app$/.test(origin)) {
      return cb(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return cb(null, true);
    }

    return cb(new Error(`Origin ${origin} not allowed by CORS`));
  },

  credentials: true,

  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],

  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// Health-check: verify env vars are loaded on Vercel
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    env: {
      dbkey: process.env.dbkey ? 'SET' : 'MISSING',
      IMAGEKIT_PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY ? 'SET' : 'MISSING',
      IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY ? 'SET' : 'MISSING',
      IMAGEKIT_URL_ENDPOINT: process.env.IMAGEKIT_URL_ENDPOINT ? 'SET' : 'MISSING',
      CLIENT_URL: process.env.CLIENT_URL || 'NOT SET',
    },
  });
});

app.get('/', (req, res) => {
  res.send('Backend API is running. Visit /health to check env vars.');
});

app.post('/post', upload.single('image'), async (req, res) => {
  try {
    // Guard: file must be present
    if (!req.file) {
      return res.status(400).json({ error: 'No image file received. Make sure the field name is "image".' });
    }

    const result = await imagekit.upload({
      file: req.file.buffer.toString('base64'),
      fileName: req.file.originalname || `upload_${Date.now()}`,
    });

    const newPost = await Post.create({
      url: result.url,
      caption: req.body.caption || '',
    });

    res.status(201).json({ message: 'Post created', data: newPost });
  } catch (err) {
    console.error('[POST /post] error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.get('/post', async (req, res) => {
  try {
    const posts = await Post.find().sort({ _id: -1 });
    res.status(200).json({ data: posts });
  } catch (err) {
    console.error('[GET /post] error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;
