const admin = require("firebase-admin");

async function verifyToken(token) {
  const tokenFormat = token.replace("Bearer ", "");

  try {
    await admin.auth().verifyIdToken(tokenFormat);
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = verifyToken;
