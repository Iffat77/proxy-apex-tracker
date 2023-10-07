const tracer = require('dd-trace').init();
const express = require('express')
const cors = require('cors')
require('dotenv').config()

const PORT = process.env.PORT || 8080

const app = express()

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//Routes
app.use('/api', require('./routes'))

//Enable cors
app.use(cors())


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))