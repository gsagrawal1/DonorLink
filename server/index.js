require("dotenv").config()
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs');
const cookieParser = require('cookie-parser');
const app = express()

const PORT = process.env.PORT || 2911

mongoose.connect(process.env.MONGO_URL).then(()=> console.log("MongoDb connected")).catch(err => console.log("MongoDB connection error:", err));
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(cookieParser());
const cors = require("cors");
app.use(cors({
  origin: ["http://localhost:5173", process.env.FRONTEND_URL], // Frontend URL
  credentials: true, // Allow cookies if needed
}));

const {checkForAuthenticationCookie} = require('./middlewares/authentication')
const {authorize} = require('./middlewares/authorization')
const staticRoutes = require('./routes/static')
const userRoutes = require('./routes/user')

app.use("/api", staticRoutes)
app.use("/api/user",checkForAuthenticationCookie, userRoutes)

const clientDistPath = path.resolve(__dirname, "..", "client", "dist");

console.log(`Server __dirname: ${__dirname}`);
console.log(`Serving static files from absolute path: ${clientDistPath}`);

// --- Diagnostic Logging ---
// Check if the directory and index.html file exist when the server starts.
try {
  const stats = fs.statSync(clientDistPath);
  if (stats.isDirectory()) {
    console.log(`SUCCESS: The directory "${clientDistPath}" exists.`);
    const indexPath = path.join(clientDistPath, 'index.html');
    fs.statSync(indexPath);
    console.log(`SUCCESS: The file "${indexPath}" exists.`);
  }
} catch (error) {
  console.error(`ERROR: Could not find client build files. Looked for "${clientDistPath}".`);
  console.error(error.message);
}
// --- End Diagnostic Logging ---


// 1. Serve static files from the calculated absolute path.
app.use(express.static(clientDistPath));

// 2. The SPA fallback. Serves index.html for any non-API, non-file requests.
app.get(/^(?!\/api).*/, (req, res) => {
  const indexPath = path.join(clientDistPath, "index.html");
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error('Error sending index.html:', err);
      res.status(500).send("Could not serve the application's main file.");
    }
  });
});


app.listen(PORT , () => {
    console.log("Server Started at :" + PORT)
})
