import admin from 'firebase-admin';

// Initialize Firebase Admin SDK if not already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert('./firebaseServiceAccountKey.json'),
  });
}

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing or invalid Authorization header' });
    }

    const idToken = authHeader.split(' ')[1];
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken; // Will contain uid and other data
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(403).json({ error: 'Unauthorized' });
  }
};
