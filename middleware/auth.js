import admin from "firebase-admin";
import fs from "fs";

// ✅ Initialize only once here
const serviceAccount = JSON.parse(
  fs.readFileSync(new URL("../firebaseServiceAccountKey.json", import.meta.url))
);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export async function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const idToken = authHeader.split(" ")[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    // ✅ Ensure only uid is passed into req.user
    req.user = { uid: decodedToken.uid };

    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized", error: err.message });
  }
}
