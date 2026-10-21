const express = require('express');
const cors = require('cors');
const multer = require('multer');
const Post = require('./model/post.model');
const imagekit = require('./services/imagekit.service');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(express.json({ limit: "1mb" }));

const allowedOrigins = (process.env.CLIENT_URL || "")
  .split(",")
  .map((url) => url.trim().replace(/\/$/, ""))
  .filter(Boolean);

const corsOptions = {
  origin(origin, cb) {
    if (!origin) return cb(null, true);

    if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
      return cb(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return cb(null, true);
    }

    return cb(new Error(`Origin ${origin} not allowed by CORS`));
  },

  credentials: true,

  methods: [
    "GET",
    "POST",
    "PUT",
    "DELETE",
    "OPTIONS"
  ],

  allowedHeaders: [
    "Content-Type",
    "Authorization"
  ]
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Backend API is running. Access the frontend application at http://localhost:5173');
});

app.post('/post', upload.single('image'), async (req, res) => {
  try {
    const result = await imagekit.upload({
      file: req.file.buffer.toString('base64'),
      fileName: req.file.originalname,
    });

    const newPost = await Post.create({
      url: result.url,
      caption: req.body.caption,
    });

    res.status(201).json({ message: 'Post created', data: newPost });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/post', async (req, res) => {
  try {
    const posts = await Post.find().sort({ _id: -1 });
    res.status(200).json({ data: posts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;
