require("dotenv").config()
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
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

const clientBuildPath = path.join(__dirname, "..", "client", "build");

// More detailed logging to confirm the path during deployment.
console.log(`Server __dirname: ${__dirname}`);
console.log(`Attempting to serve static files from: ${clientBuildPath}`);

// 1. Serve static files (CSS, JS, images).
app.use(express.static(clientBuildPath));

// 2. The SPA fallback. Serves index.html for any non-API, non-file requests.
app.get(/^(?!\/api).*/, (req, res) => {
  const indexPath = path.join(clientBuildPath, "index.html");
  console.log(`Fallback for "${req.path}", sending file: ${indexPath}`);
  
  res.sendFile(indexPath, (err) => {
    if (err) {
      // Log the error if sending the file fails.
      console.error('Error sending index.html:', err);
      res.status(500).send("An error occurred while trying to serve the application.");
    }
  });
});


app.listen(PORT , () => {
    console.log("Server Started at :" + PORT)
})
