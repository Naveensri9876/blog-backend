import admin from 'firebase-admin';
import fs from 'fs';

// ✅ Load Firebase credentials from Render secret file
const serviceAccount = JSON.parse(
  fs.readFileSync('/etc/secrets/firebaseServiceAccountKey.json', 'utf8')
);

// ✅ Initialize Firebase Admin SDK (once)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// ✅ Middleware to verify Firebase ID token
export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing or invalid Authorization header' });
    }

    const idToken = authHeader.split(' ')[1];
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken; // Firebase UID and more
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(403).json({ error: 'Unauthorized' });
  }
};
