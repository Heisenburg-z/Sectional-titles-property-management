const { app } = require("@azure/functions");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceKey.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

app.http("getStaffProfile", {
	route: "property/staff/profile/{id}",
	methods: ["GET"],
	authLevel: "anonymous",
	handler: async (request, context) => {
		const uid = request.params.id;

		console.log(uid);
		const cityRef = db.collection("accounts").doc(uid);
		const doc = await cityRef.get();
		if (doc.exists) {
			return { body: JSON.stringify(doc.data()) };
		} else {
			return { message: "Does not exist" };
		}
	}
});