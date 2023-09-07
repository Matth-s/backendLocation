const admin = require("firebase-admin");
const dotenv = require("dotenv");
const serviceAccount = require("../firebaseAdminConf.json");

dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATA_BASE_URL_HTTP,
});

module.exports = admin;
