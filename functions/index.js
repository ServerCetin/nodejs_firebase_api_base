const functions = require("firebase-functions");
const dotenv = require("dotenv");
const admin = require("firebase-admin");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({path: "/config/config.env"});

admin.initializeApp();
const app = require("./app");

exports.api = functions
    .region("europe-west1")
    .https.onRequest(app);
