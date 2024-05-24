// firebase.js
const admin = require("firebase-admin");
const serviceAccount = require("./serviceKey.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	storageBucket: "gs://sectional-titles-property.appspot.com",
});

const db = admin.firestore();
const storage = admin.storage();
module.exports = {db,storage};
// module.exports = admin.firestore();
