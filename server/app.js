const express = require("express");
const morgan = require("morgan");
const cors = require('cors')
const router = require("./routes")
const db = require("./config/db")
const { initializeSuperAdmin } = require("./controllers/auth.controller");

const app = express();

const PORT = 5009;

db()
initializeSuperAdmin();

app.use(morgan("tiny")); // get, post, put, patch, delete

// ==== короткая версия ==== // conver JSON to JS object in POST, PUT, PATCH methods
app.use(express.json()) 

// ==== короткая версия ==== // conver Form Data to JS object in POST, PUT, PATCH methods
app.use(express.urlencoded({extended: true})) 

app.use(cors())

app.use(router)

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
