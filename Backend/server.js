require('dotenv').config()
const App = require('./src/App')
const Connectdb = require('./src/db/db')

const PORT = process.env.port_no || process.env.PORT || 3000

// Always start the HTTP server first so Vercel routing works.
// DB routes will return 500 if MongoDB isn't connected, but the
// server will be up and /health will show which env vars are missing.
App.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`)
})

// Connect to MongoDB separately — does not block the server from starting.
Connectdb()
  .then(() => console.log('DB connected successfully'))
  .catch((err) => console.error('DB connection failed:', err.message))
