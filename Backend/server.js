require('dotenv').config()
const App = require('./src/App')
const Connectdb = require('./src/db/db')

const PORT = process.env.port_no || process.env.PORT || 3000

Connectdb().then(() => {
  App.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
  })
}).catch((err) => {
  console.error("Failed to connect to database:", err)
})
