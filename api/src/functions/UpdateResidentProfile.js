
const { app } = require("@azure/functions");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceKey.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
}, "updateResidentProfile");

const db = admin.firestore();

app.http("updateResidentProfile", {
	route: "property/resident/profile/{id}",
	methods: ["POST"],
	authLevel: "anonymous",
	handler: async (request, context) => {
		const uid = request.params.id;
		const newData = request.body; // Assuming you send the updated data in the request body

		console.log(newData);

		try {
			const cityRef = db.collection("accounts").doc(uid);
			const doc = await cityRef.get();
			if (doc.exists) {
				await cityRef.update(newData);
				return { message: "Profile updated successfully" };
			} else {
				return { message: "Resident does not exist" };
			}
		} catch (error) {
			return { message: "Error updating profile: " + error.message };
		}
	}
});
